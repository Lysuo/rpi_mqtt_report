# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-01 23:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WlanUsage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mInterface', models.CharField(default='unknown', max_length=10)),
                ('mPackets', models.IntegerField(default=-1)),
                ('mDate', models.CharField(default='0', max_length=50)),
            ],
        ),
    ]
