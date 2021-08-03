# Generated by Django 3.1.7 on 2021-03-09 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0005_bouquetsetsize_set_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bouquetimage',
            name='bouquet_size',
            field=models.CharField(choices=[('S', 'S'), ('M', 'M'), ('L', 'L')], default='S', max_length=1, verbose_name='Размер'),
        ),
        migrations.AlterField(
            model_name='bouquetsetsize',
            name='set_size',
            field=models.CharField(choices=[('S', 'S'), ('M', 'M'), ('L', 'L')], default='S', max_length=1, verbose_name='Размер'),
        ),
    ]