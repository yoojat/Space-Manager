# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-05 16:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('seats', '0004_auto_20180205_1557'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='seat_image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Log', to='seats.SeatImage'),
        ),
    ]
