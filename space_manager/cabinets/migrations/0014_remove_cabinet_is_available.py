# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-06-06 15:17
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cabinets', '0013_auto_20180605_2128'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cabinet',
            name='is_available',
        ),
    ]
