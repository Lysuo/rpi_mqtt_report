from django.shortcuts import render, get_object_or_404
from datetime import datetime as dt
import pytz

from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status

from mqtt_reporting.models import SensorDHEntry
from restapi.models import SensorDHResp, SensorDHEntryComp
from restapi.serializers import SensorDHRespSerializer, SensorDHEntryCompSerializer

from threading import Thread

class SensorDHEntryRest(APIView):

  def post(self, request, format=None):
    dy = request.POST.get('reqdatey')
    dm = request.POST.get('reqdatem')
    dd = request.POST.get('reqdated')
    tz_str = request.POST.get('tzinfo')
    d = request.POST.get('npph')

    tz_r = pytz.timezone(tz_str)
    tz_utc = pytz.timezone('UTC')

    start_date = tz_r.localize(dt(year=int(dy), month=int(dm), day=int(dd)))
    end_date = start_date.replace(hour=23, minute=59)

    start_date = start_date.astimezone(tz_utc)
    end_date = end_date.astimezone(tz_utc)
    l = SensorDHEntry.objects.filter(mDate__range=(start_date, end_date))

    for e in l:
      e.mDate = (e.mDate).astimezone(tz_r)

    r = computeData(l, int(d))
#    serializer = SensorDHEntryCompSerializer(lcomp, many=True)
    serializer = SensorDHRespSerializer(r)

    return Response(serializer.data)

def computeData(inputL, d):
  
  r = SensorDHResp(mTimezoneData='America')
  r.save()
  lcomp = []
  timeL = [e*0.01 for e in range(0, 2400, 100/d)]

  for t in timeL:
    # TODO improve: make a list of tuples
    lint = [e.mTemperature for e in inputL if (e.mDate.hour == int(t) and float(int(float(e.mDate.minute)*d/60))/d == t - int(t))]
    linh = [e.mHumidity for e in inputL if (e.mDate.hour == int(t) and float(int(float(e.mDate.minute)*d/60))/d == t - int(t))]

    if len(lint) != 0:
      avt = float("%.2f" % round(float(sum(lint))/float(len(lint)), 2))
      avh = float("%.2f" % round(float(sum(linh))/float(len(linh)), 2))
      o = SensorDHEntryComp(mSensorDHResp=r, mHour=t, mTemperatureAv=avt, mHumidityAv=avh)
      o.save()
      #lcomp.append(o)

  return r 
