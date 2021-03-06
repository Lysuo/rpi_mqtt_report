# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-06-18 22:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SensorDHEntryComp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mTemperatureAv', models.FloatField(default=0.0)),
                ('mHumidityAv', models.FloatField(default=0.0)),
                ('mHour', models.FloatField(default=-1.0)),
            ],
        ),
        migrations.CreateModel(
            name='SensorDHResp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mTimezoneData', models.CharField(max_length=200)),
                ('mTemperatureMax', models.FloatField(default=0.0)),
                ('mTemperatureMin', models.FloatField(default=0.0)),
                ('mTemperatureAv', models.FloatField(default=0.0)),
                ('mHumidityMax', models.FloatField(default=0.0)),
                ('mHumidityMin', models.FloatField(default=0.0)),
                ('mHumidityAv', models.FloatField(default=0.0)),
            ],
        ),
        migrations.AddField(
            model_name='sensordhentrycomp',
            name='mSensorDHResp',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='data', to='restapi.SensorDHResp'),
        ),
    ]
