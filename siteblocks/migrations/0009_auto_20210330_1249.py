# Generated by Django 3.1.7 on 2021-03-30 09:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0008_auto_20210330_1245'),
    ]

    operations = [
        migrations.RenameField(
            model_name='showcase',
            old_name='service_recomendation',
            new_name='recomendation',
        ),
    ]