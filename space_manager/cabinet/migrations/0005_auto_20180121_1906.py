# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-21 10:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cabinet', '0004_auto_20180121_1902'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cabinet',
            name='cabinet_number',
            field=models.IntegerField(null=True),
        ),
    ]
