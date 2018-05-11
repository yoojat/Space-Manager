# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-05-03 14:34
from __future__ import unicode_literals

from django.db import migrations, models
import space_manager.branches.models


class Migration(migrations.Migration):

    dependencies = [
        ('branches', '0010_branch_lounge_img_cabinet'),
    ]

    operations = [
        migrations.AddField(
            model_name='branch',
            name='minimap_img',
            field=models.ImageField(null=True, upload_to='', validators=[space_manager.branches.models.Branch.validate_image]),
        ),
    ]
