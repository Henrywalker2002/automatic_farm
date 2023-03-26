from paho.mqtt import client as mqtt_client
import random
import time
broker = "public.mqtthq.com"
port = 1883
username = ""
password = ""

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, code):
        if code == 0:
            print("Connected to MQTT Broker")
        else:
            print(f"Failed to connect, return code {code}\n")
    client_id = str(random.randint(0, 1000))
    client = mqtt_client.Client(client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def publish(client):
    msg_count = 0
    topic = "fortest"
    while True:
        msg = f"messages: {msg_count}"
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
        time.sleep(1)

def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)

run()