# Generated by Django 3.1.7 on 2021-04-22 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0015_auto_20210422_1312'),
    ]

    operations = [
        migrations.AddField(
            model_name='iconblock',
            name='bg_image',
            field=models.FileField(blank=True, max_length=255, null=True, upload_to='', verbose_name='Подложка'),
        ),
    ]