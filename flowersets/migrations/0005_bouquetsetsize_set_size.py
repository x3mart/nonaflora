# Generated by Django 3.1.7 on 2021-03-09 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0004_remove_bouquetsetsize_set_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='bouquetsetsize',
            name='set_size',
            field=models.IntegerField(choices=[(1, 'S'), (2, 'M'), (3, 'L')], default=1, verbose_name='Размер'),
        ),
    ]
