# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-04-29 16:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0019_auto_20180412_2202'),
    ]

    operations = [
        migrations.CreateModel(
            name='CabinetCostType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=45, null=True)),
                ('days', models.FloatField(blank=True, null=True)),
                ('cost', models.IntegerField(blank=True, null=True)),
                ('cost_type', models.CharField(max_length=45, null=True)),
                ('enroll_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='payment.EnrollType')),
            ],
        ),
        migrations.AddField(
            model_name='costtype',
            name='cabinet_cost_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='payment.CabinetCostType'),
        ),
    ]
