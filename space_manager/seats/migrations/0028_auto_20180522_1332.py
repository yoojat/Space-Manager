# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-05-22 13:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seats', '0027_auto_20180522_1308'),
    ]

    operations = [
        migrations.AddField(
            model_name='seat',
            name='view_left',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='seat',
            name='view_top',
            field=models.FloatField(null=True),
        ),
    ]