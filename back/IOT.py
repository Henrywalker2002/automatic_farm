import sys
from Adafruit_IO import Client, Feed, Data
import random
import time
import datetime
import dateutil.parser
import multiprocessing
import pytz
import json
import requests
from dateutil import tz

AIO_FEED_ID = "dataCollection"
AIO_USERNAME = "kimquynh1304"
AIO_KEY = "aio_xdiT7471J0EKVTYVcLwB08kupmIg"

aio = Client(AIO_USERNAME ,AIO_KEY)

class IOT:
    def __init__(self):
        pass
    
    def collectData(self): 
        while True:
            dataCollection = aio.receive("datacollection").value
            templst = dataCollection.split(':')
            temperature, airHumidity, soilMoisture, brightness = templst[0], templst[1], templst[2], templst[3]
            isFertilize = bool(aio.receive("isfertilizing").value)
            isLighting = bool(aio.receive("islighting").value)
            isWatering = bool(aio.receive("iswatering").value)
            lasttimefertilize = dateutil.parser.isoparse(aio.receive("lasttimefertilize").updated_at)
            lasttimewater = dateutil.parser.isoparse(aio.receive("lasttimewater").updated_at)
            print(templst)
            timeCollect = datetime.datetime.now()
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
                "lastTimeWater": str(lasttimewater),
                "lasttimeFertilize": str(lasttimefertilize)
            })
            headers = {
            'Content-Type': 'application/json'
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            print(response.text)
            time.sleep(600)
        # while True:
        #     timeDiff = datetime.datetime.now() - timeCollect
        #     if timeDiff.seconds >= 5*60:
        #         dataCollection = aio.receive("datacollection").value
        #         templst = dataCollection.split(':')
        #         temperature, airHumidity, soilMoisture, brightness = templst[0], templst[1], templst[2], templst[3]
        #         print(templst)
        #         timeCollect = datetime.datetime.now()
    
    def sendData(self, temperature,  airHumidity, soilMoisture, brightness):
        isLighting = int(aio.receive("islighting").value)
        isWatering = int(aio.receive("iswatering").value)
        # isFertilizing = int(aio.receive(isfertilizing))
        lastTimeWater = aio.receive_time()
        # lastTimeFertilize
        
                
    def getDetection(self):
        detectionTime = aio.receive("detection").updated_at
        lastDetectionTime = dateutil.parser.isoparse(detectionTime)
        print(lastDetectionTime)
        while True:
            detectionTime = aio.receive("detection").created_at
            timeDetect = dateutil.parser.isoparse(detectionTime)
            timeDiff = lastDetectionTime - timeDetect
            if timeDiff.seconds >= 2*60:
                from_zone = tz.gettz('UTC')
                to_zone = tz.gettz('Asia/vietnam')
                timeDetect = timeDetect.replace(tzinfo = from_zone)
                timeDetect = timeDetect.astimezone(to_zone)
                # do some notify
                url = "http://127.0.0.1:8000/detection"

                payload = json.dumps({
                "time": str(timeDetect)
                })
                headers = {
                'Content-Type': 'application/json'
                }

                response = requests.request("POST", url, headers=headers, data=payload)
                lastDetectionTime = timeDetect

    def setCondWater(self, temperature, airHumidity, soilMoisture, timeWater, type_):
        dataSend = str(int(temperature)) + ':' + str(int(airHumidity)) + ':' + str(int(soilMoisture)) + ':' + str(int(timeWater)) + ':' + str(type_)
        aio.send("allcond", dataSend)
        
    def setCondBrightness(self, brightness):
        aio.send("brightnesscond", int(brightness))
    
    def actionNow(self, type_ :str):
        aio.send("controlwork", type_)

if __name__ == "__main__":
    iot = IOT()
    p1 = multiprocessing.Process(target=iot.collectData)
    p2 = multiprocessing.Process(target=iot.getDetection)
    p1.start()
    p2.start()
    p1.join()
    p2.join()