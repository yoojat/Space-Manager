# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-21 10:02
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cabinet', '0003_cabinetlock'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cabinetset',
            options={'ordering': ['branch__branch_numorder']},
        ),
        migrations.RemoveField(
            model_name='cabinethistory',
            name='branch',
        ),
    ]
