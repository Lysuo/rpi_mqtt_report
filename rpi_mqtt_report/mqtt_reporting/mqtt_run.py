import paho.mqtt.client as mqtt
import subprocess, os
import auth as a

from mqtt_reporting.models import WlanUsage

def on_connect(client, userdata, rc):
  printLogs("[ON_CONNECT]"+"Connected with result code "+str(rc))
  client.subscribe("rpi/rx")

def on_message(client, userdata, msg):
  printLogs("[ON_MESSAGE]"+msg.topic+" "+str(msg.payload))
  print "topic: " + msg.topic +", message : " + str(msg.payload)

  w = WlanUsage(mInterface='wlan0', mPackets=int(msg.payload), mType='rx')
  w.save()

def execCmd(inCmd):
  proc = subprocess.Popen([inCmd], stdout=subprocess.PIPE, shell=True)
  out = proc.communicate()[0]
  return out

def printLogs(log):
  execCmd('date >> logFile')
  execCmd('echo '+log+' >> logFile')


client = mqtt.Client()
client.username_pw_set(username=a.user, password=a.mdp)
client.on_connect = on_connect
client.on_message = on_message
client.connect(a.host, a.port, 60)
client.loop_start()
