# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-22 05:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0007_auto_20180122_1340'),
    ]

    operations = [
        migrations.CreateModel(
            name='EnrollType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('substance', models.CharField(max_length=45, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='costtype',
            name='enroll_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='payment.EnrollType'),
        ),
    ]
