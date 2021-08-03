# Generated by Django 3.1.7 on 2021-03-30 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0009_auto_20210309_2236'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bouquet',
            options={'ordering': ['release_date'], 'verbose_name': 'Букет', 'verbose_name_plural': 'Букеты'},
        ),
        migrations.AlterModelOptions(
            name='bouquetimage',
            options={'verbose_name': 'Фото букета', 'verbose_name_plural': 'Фото букетов'},
        ),
        migrations.AlterModelOptions(
            name='bouquetsetsize',
            options={'ordering': ['-set_size'], 'verbose_name': 'Размер сета', 'verbose_name_plural': 'Размеры сетов'},
        ),
        migrations.AlterField(
            model_name='bouquetsetsize',
            name='set_size',
            field=models.CharField(choices=[('S', 'S'), ('M', 'M'), ('L', 'L')], default='S', max_length=1, unique=True, verbose_name='Размер'),
        ),
        migrations.AlterUniqueTogether(
            name='bouquetimage',
            unique_together={('bouquet', 'bouquet_size')},
        ),
    ]