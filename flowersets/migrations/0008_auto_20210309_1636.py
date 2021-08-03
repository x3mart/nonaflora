# Generated by Django 3.1.7 on 2021-03-09 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0007_auto_20210309_1339'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='info',
            name='set_description',
        ),
        migrations.AddField(
            model_name='info',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Общее описание'),
        ),
        migrations.AlterField(
            model_name='bouquet',
            name='description',
            field=models.TextField(verbose_name='Описание букета'),
        ),
        migrations.AlterField(
            model_name='bouquet',
            name='release_date',
            field=models.DateField(verbose_name='в прдаже с'),
        ),
        migrations.AlterField(
            model_name='bouquetimage',
            name='image',
            field=models.ImageField(upload_to='', verbose_name='Фото'),
        ),
        migrations.AlterField(
            model_name='bouquetsetsize',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание набора'),
        ),
        migrations.AlterField(
            model_name='bouquetsetsize',
            name='set_heigth',
            field=models.PositiveIntegerField(verbose_name='Высота букетов'),
        ),
        migrations.AlterField(
            model_name='info',
            name='recomedation',
            field=models.TextField(blank=True, null=True, verbose_name='Рекомендации по уходу'),
        ),
    ]