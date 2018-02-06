# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-06 19:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('seats', '0009_auto_20180205_1958'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seatimage',
            name='substance',
        ),
        migrations.AddField(
            model_name='seatimage',
            name='action',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='seats.Action'),
        ),
    ]
