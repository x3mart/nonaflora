# Generated by Django 3.1.7 on 2021-03-30 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0007_auto_20210311_1156'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='showcase',
            name='info_button',
        ),
        migrations.RemoveField(
            model_name='showcase',
            name='text',
        ),
        migrations.AddField(
            model_name='showcase',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание'),
        ),
        migrations.AddField(
            model_name='showcase',
            name='service_recomendation',
            field=models.TextField(blank=True, null=True, verbose_name='Рекомендации по уходу'),
        ),
        migrations.AlterField(
            model_name='showcase',
            name='buy_button',
            field=models.CharField(blank=True, max_length=55, null=True, verbose_name='Кнопка (надпись)'),
        ),
    ]
