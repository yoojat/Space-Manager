# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-05-09 14:36
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('branches', '0011_branch_minimap_img'),
    ]

    operations = [
        migrations.RenameField(
            model_name='branchconfig',
            old_name='boy_usable',
            new_name='boy_acceptable',
        ),
        migrations.RenameField(
            model_name='branchconfig',
            old_name='girl_usable',
            new_name='girl_acceptable',
        ),
        migrations.RenameField(
            model_name='branchconfig',
            old_name='man_usable',
            new_name='man_acceptable',
        ),
        migrations.RenameField(
            model_name='branchconfig',
            old_name='other_usable',
            new_name='other_acceptable',
        ),
        migrations.RenameField(
            model_name='branchconfig',
            old_name='woman_usable',
            new_name='woman_acceptable',
        ),
    ]
