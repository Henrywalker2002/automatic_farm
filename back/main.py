from fastapi import FastAPI, Body, Request
from pymongo import MongoClient
from model import *
import re
import uvicorn
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from IOT import IOT
import multiprocessing
import dateutil
import dateutil.parser
from dateutil import tz
import logging

uvicorn_error = logging.getLogger("uvicorn.error")
uvicorn_error.disabled = True
uvicorn_access = logging.getLogger("uvicorn.access")
uvicorn_access.disabled = True

app = FastAPI()

class AutomaticFarm:
    def __init__(self):
        connection_str = "mongodb+srv://henry:hungnguyen0304@cluster0.zz9j3qe.mongodb.net/?retryWrites=true&w=majority"
        client = MongoClient(connection_str)
        db = client.get_database("automatic_farm")
        self.userColl = db["user"]
        self.adminColl = db["admin"]
        self.shedule = db["schedule"]
        self.dataColl = db["dataCollection"]
        self.detect = db["detection"]
        self.iot = IOT()
        
    def insertUser(self, username: str, password: str, adminUsername : str):
        if re.match(".*(admin).*", username):
            return {"result": "fail", "message": "please dont choose username contain word 'admin'"}
        user = {"username" : username, "password": password, "adminUsername" : adminUsername, "isBan" : False}
        try:
            row = self.userColl.find_one({"username" : username})
            if row is not None:
                return {"result" : "fail", "message" : "username already exist"}
            self.userColl.insert_one(user)
            return {"result" : "success"}
        except Exception as e:
            return {"result": "fail" , "message" : str(e)}
    
    def checkUser(self, username : str, password: str):
        try:
            res = re.match("admin.*", username)
            if res: 
                row = self.adminColl.find_one({"username" : username, "password":password})
                return {"result": "success", "message" : "admin"} if row is not None else {"result": "fail", "message" : "username or password is invalid"}
            else:
                row = self.userColl.find_one({"username" : username, "password" : password})
                if row is not None:
                    if row.get("isBan"):
                        return {"result": "fail", "message" : "your account is banned"}
                    else:
                        return {"result":"success", "message": "user"}
                else: return {"result" : "fail", "message" : "username or password is invalid"}
        except Exception as e:
            return {"result" : "fail", "message": str(e)}
    
    def sendData(self, data : DataCollection):
        try :
            data = {"time":data.time ,"temperature":data.temperature ,"airHumidity":data.airHumidity ,"soilMoisture":data.soilMoisture ,
                    "brightness":data.brightness ,"isWatering":data.isWatering ,"isFertilizing":data.isFertilizing ,
                    "lastTimeWater":data.lastTimeWater ,"lastTimeFertilize":data.lasttimeFertilize}
            self.dataColl.insert_one(data)
            return {"result" : "success"}
        except Exception as e:
            return {"result" : "fail", "message": str(e)}      
    
    def getData(self):
        try:
            data = IOT.dataRealTime()
            return {"result": "success", "message" : data}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def getAllData(self):
        try:
            rows = self.dataColl.aggregate([{
                '$group' : {
                    "_id" : {"$dateToString" : {"format": "%Y-%m-%d", "date": "$time"}},
                    "brightness" : { "$avg" : "$brightness" },
                    "temperature" : { "$avg" : "$temperature" },
                    "soilMoisture" : { "$avg" : "$soilMoisture" },
                    "airHumidity" : { "$avg" : "$airHumidity" }
                }
            }, 
            {"$sort": {"_id": 1}}, 
            {"$addFields" : {"brightness" : {"$round" : ['$brightness', 1]}}},
            {"$addFields" : {"temperature" : {"$round" : ['$temperature', 1]}}},
            {"$addFields" : {"soilMoisture" : {"$round" : ['$soilMoisture', 1]}}},
            {"$addFields" : {"airHumidity" : {"$round" : ['$airHumidity', 1]}}}
            ])
            res = []
            for row in rows:
                row['time'] = row.pop('_id')
                res.append(row)
            return {"result": "success", "message" : res}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def addShedule(self, shedule: Schedule):
        try :
            type_ = shedule.type_
            isEveryday = shedule.isEveryday
            date_obj = None
            if not isEveryday:
                date = shedule.date
                try:
                    date_obj = datetime.strptime(date, '%d/%m/%Y')
                except Exception as e :
                    return {"result" : "fail", "message" : "format day must be : dd/mm/yyyy"}
            data = None
            
            if type_ == 1 or type_ == 2:
                temperature = shedule.temperature
                soilMoisture = shedule.soilMoisture
                airHumidity = shedule.airHumidity
                timeWater = shedule.timeWater
                self.iot.setCondWater(temperature, airHumidity, soilMoisture, timeWater, type_)
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date_obj, "timeWater" : timeWater,  
                "temperature": temperature, "soilMoisture": soilMoisture, "airHumidity": airHumidity}
            elif type_ == 3:
                brightness = shedule.brightness
                self.iot.setCondBrightness(brightness) 
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date_obj, "brightness": brightness}
            else:
                startTime = shedule.startTime
                endTime = shedule.endTime
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date_obj, "startTime": startTime, "endTime" : endTime}
            
            if isEveryday:
                temp = self.shedule.find_one_and_update({"type" : type_, "isEveryday": isEveryday}, {"$set" : data})
                if temp == None:
                    self.shedule.insert_one(data)
            else: 
                temp = self.shedule.find_one_and_update({"type": type_, "date" : date_obj}, {"$set" : data})
                if temp == None:
                    self.shedule.insert_one(data)
            
            return {"result": "success"}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def getActivity(self):
        try : 
            date = str(datetime.today().date())
            date_obj = datetime.strptime(date, "%Y-%m-%d")
            water = self.shedule.find_one({"type": 1, "date" : date_obj})
            if water is None:
                water = self.shedule.find_one({"type" : 1, "isEveryday": True})
            fertilize = self.shedule.find_one({"type": 2, "date" : date_obj})
            if fertilize is None:
                fertilize = self.shedule.find_one({"type" : 2, "isEveryday": True})
            light = self.shedule.find_one({"type": 3, "date" : date_obj})
            if light is None:
                light = self.shedule.find_one({"type" : 3, "isEveryday": True})
            if water is not None: water.pop("_id")
            if fertilize is not None : fertilize.pop("_id")
            if light is not None : light.pop("_id")
            return {"result": "success", "message": [water, fertilize, light]}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def getDetection(self):
        try :
            rows = self.detect.find().sort("_id", -1).limit(5)
            res = []
            for row in rows:
                row.pop('_id')
                temp = (row.get("time"))
                from_zone = tz.gettz('UTC')
                to_zone = tz.gettz('Asia/vietnam')
                temp = temp.replace(tzinfo = from_zone)
                temp = temp.astimezone(to_zone)
                res.append({"time": (temp)})
            return {"result":"success", "message" : res}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def insertDetection(self, time: datetime):
        try:
            self.detect.insert_one({"time": time})
            return {"result":"success"}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def actionNow(self, type_: int, tail : int):
        try:
            if type_ is None or tail is None:
                return {"result": "fail", "message": "wrong json"}
            if type_ < 1 or type_ > 3:
                return {"result" : "fail", "message" :"1 is water, 2 is fertilize, 3 is light"}
            if type_ == 3 and tail not in [0,1]:
                return {"result" : "fail", "message" : "flag must be 0 or 1"}
            message = str(type_) + ':' + str(tail)
            self.iot.actionNow(message)
            return {"result": "success", "message" : "done"}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def controlDetection(self, flag : bool):
        try:
            if flag:
               self.iot.controlDetection(1)
            else:
               self.iot.controlDetection(0)
            return {"result": "success", "message" : "done"}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    @classmethod
    def controlDec():
        while True:
            rows = self.dataColl.find().sort("_id", -1).limit(1)
            temp = None
            for row in rows:
                row.pop('_id')
                

AF = AutomaticFarm()

@app.get("/")
async def root():
    return {"message" :"hello world"}

@app.post("/user")
async def addUser(user : User):
    message = AF.insertUser(user.username, user.password , user.adminUsername)
    return message

@app.post("/checkAcc")
async def checkAcc(username: str = Body(), password: str = Body()):
    return AF.checkUser(username, password)

@app.get("/getData")
async def getData():
    return AF.getData()

@app.post("/schedule")
async def addShedule(schedule: Schedule):
    return AF.addShedule(schedule)

@app.get("/schedule")
async def getSchedule():
    return AF.getActivity()

@app.post("/detection")
async def addDetect(detect: Detection):
    return AF.insertDetection(detect.time)

@app.get("/detection")
async def getDetect():
    return AF.getDetection()

@app.post("/sendData")
async def sendData(data : DataCollection):
    return AF.sendData(data)

@app.post("/actionNow")
async def actionNow(request: Request):
    json = await request.json()
    if json.get("type_") == 3:
        flag = json.get("flag")
        return AF.actionNow(json.get("type_"), flag)
    return AF.actionNow(json.get("type_"), json.get("timeWater"))

@app.get('/getAllData')
async def getAddData():
    return AF.getAllData()

@app.post('/controlDetection')
async def controlDetection(request : Request):
    json = await request.json()
    if "flag" in json.keys():
        return AF.controlDetection(json.get("flag"))
    else :
        return {"result": "fail", "message" : "wrong json"}
    

origins = [
    "http://localhost:3000", 
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uvicorn.run(app, host= "0.0.0.0", port= 8000)