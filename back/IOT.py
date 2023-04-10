import sys
from paho.mqtt import client as mqtt_client
import random
import time
import datetime
import dateutil.parser
import multiprocessing
import pytz
import json
import requests
from dateutil import tz

broker = 'broker.mqttdashboard.com'
# generate client ID with pub prefix randomly
port = 1883
client_id = f'python-mqtt-{random.randint(0, 1000)}'

temperature, airHumidity, soilMoisture, brightness = 30, 30, 30, 30
isFertilize, isLighting, isWatering = False, False, False
lastTimeWater, lastTimeFertilize = "2023:04:10:20:55", "2023:04:10:20:55"
flagDetect = True

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    def on_message(client, userdata, message):
        if message.topic == "244_detection": 
            IOT.getDetection(str(message.payload)[2:-1])
        elif message.topic == "244_dataCollection":
            templst = str(message.payload)[2:-1].split(':')
            global temperature, airHumidity, soilMoisture, brightness
            temperature, airHumidity, soilMoisture, brightness = templst[0], templst[1], templst[2], templst[3]
        elif message.topic == "244_isLighting":
            global isLighting 
            isLighting = bool(int(str(message.payload)[2:-1]))
        elif message.topic == "244_isFertilizing":
            global isFertilize 
            isFertilize = bool(int(str(message.payload)[2:-1]))
        elif message.topic == "244_isWatering":
            global isWatering 
            isWatering = bool(int(str(message.payload)[2:-1]))
        elif message.topic == "244_lastTimeWater":
            global lastTimeWater
            lastTimeWater = str(message.payload)[2:-1]
        elif message.topic == "244_lastTimeFertilize":
            global lastTimeFertilize
            lastTimeFertilize = str(message.payload)[2:-1]
    
    client = mqtt_client.Client(client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    client.on_message = on_message
    client.subscribe("244_dataCollection")
    client.subscribe("244_isLighting")
    client.subscribe("244_isFertilizing")
    client.subscribe("244_isWatering")
    client.subscribe("244_detection")
    client.subscribe("244_lastTimeWater")
    client.subscribe("244_lastTimeFertilize")
    return client

class IOT:
    def __init__(self):
        self.client = connect_mqtt()
        self.client.loop_start()
    
    @classmethod
    def collectData(cls): 
        while True:
            timeCollect = datetime.datetime.now()
            global lastTimeFertilize, lastTimeWater
            water = datetime.datetime.strptime(lastTimeWater, "%Y:%m:%d:%H:%S")
            fertilize =  datetime.datetime.strptime(lastTimeFertilize, "%Y:%m:%d:%H:%S")
            url = "http://127.0.0.1:8000/sendData"
            payload = json.dumps({
                "time": str(timeCollect),
                "temperature": temperature,
                "airHumidity": airHumidity,
                "soilMoisture": soilMoisture,
                "brightness": brightness,
                "isWatering": isWatering,
                "isLighting": isLighting,
                "isFertilizing": isFertilize,
                "lastTimeWater" : water.isoformat(),
                "lasttimeFertilize": fertilize.isoformat()
            })
            
            headers = {
            'Content-Type': 'application/json'
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            time.sleep(60)
    
    @classmethod
    def dataRealTime(cls):
        timeCollect = datetime.datetime.now()
        global lastTimeFertilize, lastTimeWater
        water = datetime.datetime.strptime(lastTimeWater, "%Y:%m:%d:%H:%M")
        fertilize =  datetime.datetime.strptime(lastTimeFertilize, "%Y:%m:%d:%H:%M")
        payload = {
            "time": str(timeCollect),
            "temperature": temperature,
            "airHumidity": airHumidity,
            "soilMoisture": soilMoisture,
            "brightness": brightness,
            "isWatering": isWatering,
            "isLighting": isLighting,
            "isFertilizing": isFertilize,
            "lastTimeWater" : water.isoformat(),
            "lasttimeFertilize": fertilize.isoformat(),
            "isDetectOn": flagDetect
        }
        
        return payload
        
    @classmethod    
    def getDetection(cls, time):
        detectionTime = datetime.datetime.strptime(time, "%Y:%m:%d:%H:%M")
        url = "http://127.0.0.1:8000/detection"
        payload = json.dumps({
        "time": str(detectionTime.isoformat())
        })
        headers = {
        'Content-Type': 'application/json'
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        
        print(payload)

    def setCondWater(self, temperature, airHumidity, soilMoisture, timeWater, type_):
        dataSend = str(int(temperature)) + ':' + str(int(airHumidity)) + ':' + str(int(soilMoisture)) + ':' + str(int(timeWater)) + ':' + str(type_)
        self.client.publish("244_allCond", dataSend)
        
    def setCondBrightness(self, brightness):
        self.client.publish("244_brightnessCond", int(brightness))
    
    def actionNow(self, type_ :str):
        self.client.publish("244_controlWork", type_)
    
    def controlDetection(self, flag: int):
        global flagDetect
        if flag == 0:
            flagDetect = False
        else :
            flagDetect = True
        self.client.publish("244_controlWork", "4:" + str(flag))

def loopCollect():
    IOT.collectData()  

if __name__ == "__main__":
    iot = IOT()
    t1 = multiprocessing.Process(target = loopCollect)
    t1.start()
    t1.join()
    