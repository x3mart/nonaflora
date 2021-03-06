# Generated by Django 3.1.7 on 2021-04-22 11:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0013_auto_20210422_1308'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpecialOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('goods', models.CharField(default='Индивидуальная подписка на месяц', max_length=60, verbose_name='Название')),
                ('price', models.PositiveIntegerField(blank=True, null=True, verbose_name='Цена')),
                ('quantity', models.PositiveIntegerField(default=1, verbose_name='Количество')),
                ('link', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ссылка')),
                ('order_date', models.DateField(default=datetime.date(2021, 4, 22))),
            ],
            options={
                'verbose_name': 'Спец заказ',
                'verbose_name_plural': 'Спец заказы',
                'ordering': ['-id'],
            },
        ),
        migrations.AddField(
            model_name='order',
            name='orderId',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Номер заказа Сбере'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Статус'),
        ),
    ]
