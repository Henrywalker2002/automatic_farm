from fastapi import FastAPI, Body
from pymongo import MongoClient
from model import *
import re
import uvicorn

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
            date = None
            startTime = shedule.startTime
            endTime = shedule.endTime
            if not isEveryday:
                date = shedule.date
            data = None
            
            if type_ == 1 or type_ == 2:
                temperature = shedule.temperature
                soilMoisture = shedule.soilMoisture
                airHumidity = shedule.airHumidity
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date, "startTime": startTime, "endTime" : endTime, 
                "temperature": temperature, "soilMoisture": soilMoisture, "airHumidity": airHumidity}
            elif type_ == 3:
                brightness = shedule.brightness
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date, "startTime": startTime, "endTime" : endTime, 
                "brightness": brightness}
            else:
                data = {"type" : type_, "isEveryday" : isEveryday, "date": date, "startTime": startTime, "endTime" : endTime}
            
            if isEveryday:
                temp = self.shedule.find_one_and_update({"type" : type_, "isEveryday": isEveryday}, data)
                if temp == None:
                    self.shedule.insert_one(data)
            else: 
                temp = self.shedule.find_one_and_update({"type": type_, "date" : date}, data)
                if temp == None:
                    self.shedule.insert_one(data)
            
            return {"result": "success"}
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
    return AF.addShedule(shedule)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)