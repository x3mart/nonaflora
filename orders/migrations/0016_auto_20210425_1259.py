# Generated by Django 3.1.7 on 2021-04-25 09:59

import datetime
from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0015_auto_20210424_1409'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='adress',
            field=models.TextField(verbose_name='Адрес получателя'),
        ),
        migrations.AlterField(
            model_name='order',
            name='name2',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Имя получателя'),
        ),
        migrations.AlterField(
            model_name='order',
            name='orderId',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Номер Сбер'),
        ),
        migrations.AlterField(
            model_name='order',
            name='phone2',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=60, null=True, region=None, verbose_name='Телефон получателя'),
        ),
        migrations.AlterField(
            model_name='promo',
            name='expiration',
            field=models.DateField(default=datetime.date(2021, 4, 25)),
        ),
        migrations.AlterField(
            model_name='specialorder',
            name='order_date',
            field=models.DateField(default=datetime.date(2021, 4, 25)),
        ),
    ]
