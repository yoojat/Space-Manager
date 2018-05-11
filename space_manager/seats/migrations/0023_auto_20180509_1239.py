# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-05-09 12:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seats', '0022_identity_is_youth'),
    ]

    operations = [
        migrations.RenameField(
            model_name='identity',
            old_name='is_youth',
            new_name='adult_available',
        ),
        migrations.RemoveField(
            model_name='identity',
            name='is_adult',
        ),
        migrations.RemoveField(
            model_name='identity',
            name='is_female',
        ),
        migrations.RemoveField(
            model_name='identity',
            name='is_male',
        ),
        migrations.AddField(
            model_name='identity',
            name='female_available',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='identity',
            name='male_available',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='identity',
            name='youth_available',
            field=models.BooleanField(default=True),
        ),
    ]