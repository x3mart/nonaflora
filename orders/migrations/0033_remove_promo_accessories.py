# Generated by Django 3.1.7 on 2021-06-21 20:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0032_auto_20210621_2012'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='promo',
            name='accessories',
        ),
    ]