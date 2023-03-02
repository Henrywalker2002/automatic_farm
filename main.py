from fastapi import FastAPI, Body
from pymongo import MongoClient
from model import *
import re
import uvicorn
from datetime import datetime

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
                row = self.userColl.find_one({"username" : "username", "password" : password})
                if row is not None:
                    if row.isBan:
                        return {"result": "fail", "message" : "your account is banned"}
                    else:
                        return {"result":"success", "message": "user"}
                else: return {"result" : "fail", "message" : "username or password is invalid"}
        except Exception as e:
            return {"result" : "fail", "message": str(e)}
    
    def getData(self):
        try:
            rows = self.dataColl.find().sort("_id", -1).limit(1)
            for row in rows:
                row.pop('_id')
                return {"result": "success", "message" : row}
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
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date_obj, "timeWater" : timeWater,  
                "temperature": temperature, "soilMoisture": soilMoisture, "airHumidity": airHumidity}
            elif type_ == 3:
                startTime = shedule.startTime
                endTime = shedule.endTime
                brightness = shedule.brightness
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date_obj, "startTime": startTime, "endTime" : endTime, 
                "brightness": brightness}
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
            fertilize = self.shedule.find_one({"type": 2, "date" : date})
            if fertilize is None:
                fertilize = self.shedule.find_one({"type" : 2, "isEveryday": True})
            light = self.shedule.find_one({"type": 3, "date" : date})
            if light is None:
                light = self.shedule.find_one({"type" : 3, "isEveryday": True})
            water.pop("_id")
            return {"result": "success", "message": [water, fertilize, light]}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def getDetection(self):
        try :
            rows = self.detect.find().sort("_id", -1).limit(5)
            res = []
            for row in rows:
                row.pop('_id')
                res.append(row)
            return {"result":"success", "message" : res}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}
    
    def insertDetection(self, time: datetime):
        try:
            self.detect.insert_one({"time": time})
            return {"result":"success"}
        except Exception as e:
            return {"result" : "fail", "message" : str(e)}


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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)