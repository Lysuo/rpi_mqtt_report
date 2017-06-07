from mqtt_reporting.models import SensorDHEntry 
from rest_framework import serializers
import datetime

class SensorDHEntrySerializer(serializers.ModelSerializer):
  mId = serializers.CharField(source="id", required=False)
  mTemperature = serializers.FloatField()
  mHumidity = serializers.FloatField()
  mDate = serializers.DateTimeField()
  mTimezone = serializers.CharField()

  class Meta:
    model = SensorDHEntry 
    fields = ('mId', 'mTemperature', 'mHumidity', 'mDate', 'mTimezone')
