# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-07-24 14:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('branches', '0015_auto_20180724_1442'),
    ]

    operations = [
        migrations.AddField(
            model_name='branchconfig',
            name='boy_acceptable_number',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='branchconfig',
            name='girl_acceptable_number',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='branchconfig',
            name='woman_acceptable_number',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='branchconfig',
            name='boy_acceptable',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='branchconfig',
            name='girl_acceptable',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='branchconfig',
            name='woman_acceptable',
            field=models.BooleanField(default=True),
        ),
    ]
