# Generated by Django 3.1.7 on 2021-05-02 15:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0024_goodsrefunded'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goodsrefunded',
            name='order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='goodsrefunded', to='orders.order'),
        ),
    ]
