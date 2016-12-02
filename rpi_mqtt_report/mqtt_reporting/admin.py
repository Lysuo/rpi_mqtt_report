from django.contrib import admin
from mqtt_reporting.models import WlanUsage

# Register your models here.

class WlanUsageAdmin(admin.ModelAdmin):
  list_display = ('id', 'mInterface', 'mType', 'mPackets', 'mDate', )
  list_filter = ('mInterface', 'mType', )
  ordering = ('-id',)

admin.site.register(WlanUsage, WlanUsageAdmin)
