import paho.mqtt.client as mqtt
import time

def on_message(client, userdata, message):
    print("received message: " ,str(message.payload.decode("utf-8")))

client = mqtt.Client("Device")
client.connect("localhost", 1883, 60) 

client.loop_start()

client.subscribe("/data")
client.on_message=on_message 

time.sleep(30)
client.loop_stop()