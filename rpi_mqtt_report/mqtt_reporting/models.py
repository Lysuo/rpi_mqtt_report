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
