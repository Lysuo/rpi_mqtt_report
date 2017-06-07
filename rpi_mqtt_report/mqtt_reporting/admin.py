from django.contrib import admin
from mqtt_reporting.models import WlanUsage, SensorDHEntry

# Register your models here.

class WlanUsageAdmin(admin.ModelAdmin):
  list_display = ('id', 'mInterface', 'mType', 'mPackets', 'mDate', )
  list_filter = ('mInterface', 'mType', )
  ordering = ('-id',)

class SensorDHEntryAdmin(admin.ModelAdmin):
  list_display = ('id', 'mInterface', 'mTemperature', 'mHumidity', 'mDate', )
  list_filter = ('mInterface', 'mDate', )
  ordering = ('-id',)

admin.site.register(WlanUsage, WlanUsageAdmin)
admin.site.register(SensorDHEntry, SensorDHEntryAdmin)
