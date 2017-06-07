from django.shortcuts import render, get_object_or_404
from datetime import datetime as dt
import pytz

from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status

from mqtt_reporting.models import SensorDHEntry
from restapi.serializers import SensorDHEntrySerializer


from threading import Thread


class SensorDHEntryRest(APIView):

  def get(self, request, format=None):
    dy = request.META.get('HTTP_REQDATEY')
    dm = request.META.get('HTTP_REQDATEM')
    dd = request.META.get('HTTP_REQDATED')
    tz_str = request.META.get('HTTP_TZINFO')

    tz_r = pytz.timezone(tz_str)
    tz_utc = pytz.timezone('UTC')

    start_date = tz_r.localize(dt(year=int(dy), month=int(dm), day=int(dd)))
    end_date = start_date.replace(hour=23, minute=59)

    start_date = start_date.astimezone(tz_utc)
    end_date = end_date.astimezone(tz_utc)

    print start_date
    print end_date

    #l = SensorDHEntry.objects.all()
    l = SensorDHEntry.objects.filter(mDate__range=(start_date, end_date))

    for e in l:
      e.mDate = (e.mDate).astimezone(tz_r)

    serializer = SensorDHEntrySerializer(l, many=True)
    return Response(serializer.data)
