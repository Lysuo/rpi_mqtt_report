from __future__ import unicode_literals
from django.db import models


class SensorDHResp(models.Model):
  mTimezoneData = models.CharField(max_length=200)
  mTemperatureMax = models.FloatField(default=0.0) 
  mTemperatureMin = models.FloatField(default=0.0) 
  mTemperatureAv = models.FloatField(default=0.0) 
  mHumidityMax = models.FloatField(default=0.0)
  mHumidityMin = models.FloatField(default=0.0)
  mHumidityAv = models.FloatField(default=0.0)

  def get_entries(self):
    data = SensorDHEntryComp.objects.filter(mSensorDHResp=self)
    return data

  def __unicode__(self):
    return self.mTimezoneData

class SensorDHEntryComp(models.Model):
  mSensorDHResp = models.ForeignKey(SensorDHResp, related_name='data')
  mTemperatureAv = models.FloatField(default=0.0) 
  mHumidityAv = models.FloatField(default=0.0) 
  mHour = models.FloatField(default=-1.0)

  def __unicode__(self):
    return self.TemperatureAv

