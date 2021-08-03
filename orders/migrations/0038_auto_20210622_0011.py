# Generated by Django 3.1.7 on 2021-06-21 21:11

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0019_accessory_short_title'),
        ('orders', '0037_auto_20210621_2352'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promo',
            name='accessory',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='promos', to='siteblocks.accessory', verbose_name='Аксессуар'),
        ),
        migrations.AlterField(
            model_name='promo',
            name='expiration',
            field=models.DateField(default=datetime.date(2021, 6, 22)),
        ),
        migrations.AlterField(
            model_name='specialorder',
            name='order_date',
            field=models.DateField(default=datetime.date(2021, 6, 22)),
        ),
    ]