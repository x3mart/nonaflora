# Generated by Django 3.1.7 on 2021-04-28 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0016_auto_20210428_1611'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bouquetsetsize',
            name='code',
            field=models.CharField(default='set-', max_length=60, unique=True, verbose_name='Артикул'),
        ),
    ]
