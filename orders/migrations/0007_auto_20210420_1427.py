# Generated by Django 3.1.7 on 2021-04-20 11:27

import datetime
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_auto_20210416_0115'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='building',
        ),
        migrations.RemoveField(
            model_name='order',
            name='delivery_end_time',
        ),
        migrations.RemoveField(
            model_name='order',
            name='delivery_start_time',
        ),
        migrations.RemoveField(
            model_name='order',
            name='first_delivery',
        ),
        migrations.RemoveField(
            model_name='order',
            name='floor',
        ),
        migrations.RemoveField(
            model_name='order',
            name='intercom',
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_paid',
        ),
        migrations.RemoveField(
            model_name='order',
            name='street',
        ),
        migrations.AddField(
            model_name='order',
            name='adress',
            field=models.CharField(default=1, max_length=255, verbose_name='Адрес'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_day',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='День доставки'),
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_time',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Время доставки'),
        ),
        migrations.AddField(
            model_name='order',
            name='promo',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Промокод'),
        ),
        migrations.AlterField(
            model_name='order',
            name='comment',
            field=models.TextField(blank=True, null=True, verbose_name='Пожелание'),
        ),
        migrations.AlterField(
            model_name='order',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, verbose_name='email'),
        ),
        migrations.AlterField(
            model_name='order',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=60, region=None, verbose_name='Телефон'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='promo',
            name='expiration',
            field=models.DateField(default=datetime.date(2021, 4, 20)),
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, verbose_name='Название')),
                ('price', models.PositiveIntegerField(verbose_name='Цена')),
                ('quantity', models.PositiveIntegerField(verbose_name='Количество')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='orders.order')),
            ],
        ),
    ]
