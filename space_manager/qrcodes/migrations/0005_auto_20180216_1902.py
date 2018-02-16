# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-16 19:02
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('qrcodes', '0004_auto_20180213_0251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qr',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
