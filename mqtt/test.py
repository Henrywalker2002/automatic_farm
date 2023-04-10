import random
import time

from paho.mqtt import client as mqtt_client

broker = 'broker.mqttdashboard.com'
topic = "15656_allCond"
# generate client ID with pub prefix randomly
port = 1883
client_id = f'python-mqtt-{random.randint(0, 1000)}'
# username = 'emqx'
# password = 'public'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
    
    def on_message(client, userdata, message):
        print(str(message.payload)[2:-1] + ':' + str(message.topic))
    
    client = mqtt_client.Client(client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    client.on_message = on_message
    return client

def publish(client):
    msg_count = 0
    while True:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1

def run():
    client = connect_mqtt()
    client.loop_start()
    client.subscribe("test156")
    while True: 
        pass 

if __name__ == '__main__':
    run()
