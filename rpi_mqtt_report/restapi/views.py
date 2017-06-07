from django.shortcuts import render, get_object_or_404

from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status

from mqtt_reporting.models import SensorDHEntry
from restapi.serializers import SensorDHEntrySerializer


from threading import Thread


class SensorDHEntryRest(APIView):

  def get(self, request, format=None):
    l = SensorDHEntry.objects.all()
    serializer = SensorDHEntrySerializer(l, many=True)
    return Response(serializer.data)
