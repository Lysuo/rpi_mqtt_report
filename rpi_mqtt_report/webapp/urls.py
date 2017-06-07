from django.conf.urls import include, url
from django.contrib import admin
import webapp.views as v

urlpatterns = [ 
    url(r'^$', v.home, name='home'),
]
