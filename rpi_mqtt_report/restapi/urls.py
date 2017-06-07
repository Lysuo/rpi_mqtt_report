from django.conf.urls import include, url
from django.contrib import admin

import restapi.views as v

urlpatterns = [ 
    url(r'^sensorData/$', v.SensorDHEntryRest().as_view()),
    ]
