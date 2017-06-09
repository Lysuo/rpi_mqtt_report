from mqtt_reporting.models import SensorDHEntry, SensorDHEntryComp
from rest_framework import serializers
import datetime

class SensorDHEntrySerializer(serializers.ModelSerializer):
  mTemperature = serializers.FloatField()
  mHumidity = serializers.FloatField()
  mDate = serializers.DateTimeField(format="%H")

  class Meta:
    model = SensorDHEntry 
    fields = ('mTemperature', 'mHumidity', 'mDate')


class SensorDHEntryCompSerializer(serializers.ModelSerializer):
  temp = serializers.FloatField(source="mTemperatureAv")
  hum = serializers.FloatField(source="mHumidityAv")
  hour = serializers.FloatField(source="mHour")

  class Meta:
    model = SensorDHEntryComp
    fields = ('temp', 'hum', 'hour')
