from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    username : str
    password : str
    isBan : Optional[bool]
    adminUsername : str

class DataCollection(BaseModel):
    time: datetime
    temperature : float
    airHumidity: float 
    soilMoisture: float 
    brightness : float 
    isWatering : bool 
    isLighting : bool 
    isFertilizing: bool 
    lastTimeWater : datetime
    lasttimeFertilize: datetime 

class Schedule(BaseModel):
    type_ : int
    airHumidity : Optional[float]
    soilMoisture : Optional[float]
    temperature : Optional[float]
    brightness : Optional[float]
    isEveryday: bool
    date : Optional[str]
    startTime : Optional[str]
    endTime: Optional[str]
    username: str
    timeWater : Optional[int]

class Detection(BaseModel):
    time : datetime

