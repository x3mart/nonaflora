# Generated by Django 3.1.7 on 2021-04-27 15:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0016_auto_20210425_1259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promo',
            name='expiration',
            field=models.DateField(default=datetime.date(2021, 4, 27)),
        ),
        migrations.AlterField(
            model_name='specialorder',
            name='order_date',
            field=models.DateField(default=datetime.date(2021, 4, 27)),
        ),
    ]
