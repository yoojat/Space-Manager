# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-06-05 21:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cabinets', '0011_remove_cabinet_is_clean'),
    ]

    operations = [
        migrations.AddField(
            model_name='cabinet',
            name='is_clean',
            field=models.BooleanField(default=True),
        ),
    ]
