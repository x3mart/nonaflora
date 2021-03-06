# Generated by Django 3.1.7 on 2021-04-02 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='orderId',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Номер заказа Сбере'),
        ),
        migrations.AddField(
            model_name='order',
            name='orderNumber',
            field=models.CharField(blank=True, max_length=60, null=True, verbose_name='Номер заказа'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.IntegerField(default=0),
        ),
    ]
