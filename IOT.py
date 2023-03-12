import sys
from Adafruit_IO import MQTTClient
import random
import time

AIO_FEED_ID = "test"
AIO_USERNAME = "henrywalker"
AIO_KEY = "aio_Yjhz15mi59RH5hTv0YLMTIb70lnZ"

def connected(client):
    print("Ket noi thanh cong ...")
    client.subscribe(AIO_FEED_ID)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print(payload)

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    value = random.randint(0, 100)
    time.sleep(30)
    data = client.receive("test")
    print(data)