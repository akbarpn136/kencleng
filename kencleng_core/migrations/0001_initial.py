# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2018-01-06 06:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaksi',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deskripsi', models.TextField()),
                ('jumlah', models.DecimalField(decimal_places=2, max_digits=20)),
                ('dibuat', models.DateField(auto_now_add=True)),
                ('diubah', models.DateField(auto_now=True)),
            ],
        ),
    ]
