# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-06-07 23:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mqtt_reporting', '0006_sensordhentry_mtimezone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensordhentry',
            name='mDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]