# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-05-09 12:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('seats', '0020_seat_now_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Identity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=45, null=True)),
                ('is_male', models.BooleanField()),
                ('is_female', models.BooleanField()),
                ('is_adult', models.BooleanField()),
            ],
        ),
        migrations.RemoveField(
            model_name='seat',
            name='now_using',
        ),
        migrations.AddField(
            model_name='seat',
            name='for_who',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='seats.Identity'),
        ),
    ]