from mqtt_reporting.models import SensorDHEntry
from restapi.models import SensorDHResp, SensorDHEntryComp
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

class SensorDHRespSerializer(serializers.ModelSerializer):
  mTimezoneData = serializers.CharField()
  mTemperatureMax = serializers.FloatField() 
  mTemperatureMin = serializers.FloatField() 
  mTemperatureAv = serializers.FloatField() 
  mHumidityMax = serializers.FloatField()
  mHumidityMin = serializers.FloatField()
  mHumidityAv = serializers.FloatField()
  data = SensorDHEntryCompSerializer(source='get_entries', many=True, read_only=True)

  class Meta:
    model = SensorDHResp
    fields = ('mTimezoneData', 'mTemperatureMax', 'mTemperatureMin', 'mTemperatureAv', 'mHumidityMax', 'mHumidityMin', 'mHumidityAv', 'data')
