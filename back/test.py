import random
import datetime
import json
import requests

for i in range(0, 500):
    temperature, airHumidity, soilMoisture, brightness = random.uniform(20, 30), random.uniform(40, 60), random.uniform(20, 80), random.uniform(0, 70)

    isFertilize = bool(random.randint(0, 1))
    isLighting =  bool(random.randint(0, 1))
    isWatering =  bool(random.randint(0, 1))
    lasttimefertilize = datetime.datetime.now()
    lasttimewater = datetime.datetime.now()

    timeCollect = datetime.datetime.now() - datetime.timedelta(days= 5)
    url = "http://103.77.173.109:8000/sendData"
    payload = json.dumps({
        "time": str(timeCollect + datetime.timedelta(hours= i)),
        "temperature": round(temperature,1),
        "airHumidity": round(airHumidity, 1),
        "soilMoisture": round(soilMoisture, 1),
        "brightness": round(brightness, 1),
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