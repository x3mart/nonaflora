# Generated by Django 3.1.7 on 2021-03-30 16:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0011_auto_20210330_1334'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Info',
        ),
        migrations.RemoveField(
            model_name='bouquetsetsize',
            name='description',
        ),
        migrations.RemoveField(
            model_name='bouquetsetsize',
            name='set_heigth',
        ),
    ]
