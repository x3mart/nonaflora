# Generated by Django 3.1.7 on 2021-04-28 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0014_bouquetsetsize_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bouquetsetsize',
            name='code',
            field=models.CharField(default=1, max_length=60, verbose_name='Артикул'),
            preserve_default=False,
        ),
    ]
