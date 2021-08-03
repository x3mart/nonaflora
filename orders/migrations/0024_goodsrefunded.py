# Generated by Django 3.1.7 on 2021-05-02 15:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0023_auto_20210502_1204'),
    ]

    operations = [
        migrations.CreateModel(
            name='GoodsRefunded',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, verbose_name='Название')),
                ('code', models.CharField(blank=True, max_length=60, null=True, verbose_name='Артикул')),
                ('price', models.PositiveIntegerField(verbose_name='Цена')),
                ('quantity', models.PositiveIntegerField(verbose_name='Количество')),
                ('order', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='goods_refunded', to='orders.order')),
            ],
        ),
    ]