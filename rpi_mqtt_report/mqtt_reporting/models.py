from __future__ import unicode_literals

from django.db import models

# Create your models here.

class WlanUsage(models.Model):
  mInterface = models.CharField(default='unknown', max_length=10) 
  mPackets = models.IntegerField(default=-1)
  mType = models.CharField(default='unknown', max_length=10)
  mDate = models.DateTimeField(auto_now_add=True)

  def __unicode__(self):
    return self.mInterface


class SensorDHEntry(models.Model):
  mInterface = models.CharField(default='unknown', max_length=10) 
  mTemperature = models.FloatField(default=0.0) 
  mHumidity = models.FloatField(default=0.0)
  mDate = models.DateTimeField(auto_now_add=True)
  mTimezone = models.CharField(max_length=200)

  def __unicode__(self):
    return self.mInterface


class SensorDHEntryComp(models.Model):
  mTemperatureAv = models.FloatField(default=0.0) 
  mHumidityAv = models.FloatField(default=0.0) 
  mHour = models.IntegerField(default=-1)

  def __unicode__(self):
    return self.TemperatureAv
