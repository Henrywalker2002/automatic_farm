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
            print(templst)
            timeCollect = datetime.datetime.now()
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
            detectionTime = aio.receive("detection").updated_at
            timeDetect = dateutil.parser.isoparse(detectionTime)
            timeDiff = lastDetectionTime - timeDetect
            if timeDiff.seconds >= 2*60:
                # do some notify
                url = "http://127.0.0.1:8000/detection"

                payload = json.dumps({
                "time": "2023-03-02T14:38:48.509Z"
                })
                headers = {
                'Content-Type': 'application/json'
                }

                response = requests.request("POST", url, headers=headers, data=payload)

                print(response.text)
                lastDetectionTime = dateutil.parser.isoparse(detectionTime)

    def setCondWater(self, temperature, airHumidity, soilMoisture, timeWater, type_):
        dataSend = str(temperature) + ':' + str(airHumidity) + ':' + str(soilMoisture) + ':' + str(timeWater) + ':' + str(type_)
        aio.send("allcond", dataSend)
        
    def setCondBrightness(self, brightness):
        aio.send("brightnessCond", brightness)
    
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