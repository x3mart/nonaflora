# Generated by Django 3.1.7 on 2021-04-28 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0018_auto_20210428_1637'),
    ]

    operations = [
        migrations.AddField(
            model_name='accessory',
            name='short_title',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Краткое наименование'),
        ),
    ]
