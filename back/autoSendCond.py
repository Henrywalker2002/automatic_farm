import schedule
import time 
import requests
import json

def sendCond():
    url = "http://103.77.173.109:8000/schedule"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    for x in response.json()['message']:
        if x['type'] == 1 or x['type'] == 2:
            payload = json.dumps({
                "type_": x['type'],
                "airHumidity": x['airHumidity'],
                "soilMoisture": x['soilMoisture'],
                "temperature": x['temperature'],
                "isEveryday": x['isEveryday'],
                "date": x['date'],
                "timeWater": x['timeWater'],
                "username": "string"
            })
            headers = {
            'Content-Type': 'application/json'
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            print(response.text)
        elif x['type'] == 3:
            url = "http://103.77.173.109:8000/schedule"

            payload = json.dumps({
                "type_": 3,
                "isEveryday": x['isEveryday'],
                "date": x['date'],
                "username": "string",
                "brightness": x['brightness']
            })
            headers = {
            'Content-Type': 'application/json'
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            print(response.text)
        
schedule.every().day.at("00:00").do(sendCond)
while True:
    schedule.run_pending()
    time.sleep(1)