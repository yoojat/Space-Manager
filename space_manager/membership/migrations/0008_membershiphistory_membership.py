# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-30 11:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('membership', '0007_auto_20180130_2026'),
    ]

    operations = [
        migrations.AddField(
            model_name='membershiphistory',
            name='membership',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='membership.Membership'),
        ),
    ]
