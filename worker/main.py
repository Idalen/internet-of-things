import paho.mqtt.client as mqtt
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
import time
from datetime import datetime
import pytz

# TODO: CRIAR DOTENV PARA DADOS ABAIXO!
url = 'http://database:8086'
token = '1LWy6GO7ZRQy0CnzzNZTA_KUhgznI4b78xWPvFyAm17H9tYEImJ8mXYqZmvVVCWG9fXwTUDABPvmIS68kBrr8g=='
org = 'users'
bucket = 'data'

def on_message(client, userdata, message):
    # Manda pro 
    
    val = float(str(message.payload.decode("utf-8")))
    print("received message: " , val)

    with InfluxDBClient(url=url, token=token, org=org) as database:
        p = Point(message.topic.split("/")[1]) \
        .field(message.topic.split("/")[2], val).time(datetime.now(pytz.UTC))

        with database.write_api(write_options=SYNCHRONOUS) as write_api:
                  write_api.write(bucket=bucket, record=p)
    


print("Initializing MQTT worker")

client = mqtt.Client("Listener")
client.connect("broker", 1883, 60)

print("Connected to broker at 'broker:1883'")

client.loop_start()
client.subscribe("/smelling_pepper/temperature")
client.subscribe("/smelling_pepper/humidity")
client.on_message=on_message 

try:
    while True:
        time.sleep(1)
  
except KeyboardInterrupt:
    print("exiting")
    client.disconnect()
    client.loop_stop()
