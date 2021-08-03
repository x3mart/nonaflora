# Generated by Django 3.1.7 on 2021-06-21 20:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accessories', '0004_auto_20210428_1611'),
        ('orders', '0033_remove_promo_accessories'),
    ]

    operations = [
        migrations.AddField(
            model_name='promo',
            name='accessories',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='sets', to='accessories.accessory', verbose_name='Подписка'),
        ),
    ]