# Generated by Django 3.1.7 on 2021-03-30 18:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0011_auto_20210330_2134'),
    ]

    operations = [
        migrations.RenameField(
            model_name='galleryimage',
            old_name='images',
            new_name='image',
        ),
    ]
