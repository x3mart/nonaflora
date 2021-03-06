# Generated by Django 3.1.7 on 2021-03-10 18:59

from django.db import migrations, models
import faicon.fields


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0004_contact_phone_social'),
    ]

    operations = [
        migrations.CreateModel(
            name='Showcase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True, verbose_name='Заголовок')),
                ('subtitle', models.CharField(blank=True, max_length=255, null=True, verbose_name='Подзаголовок')),
                ('text', models.TextField(blank=True, null=True, verbose_name='Текст')),
            ],
            options={
                'verbose_name': 'Витрина',
                'verbose_name_plural': 'Витрины',
                'ordering': ['id'],
            },
        ),
        migrations.AddField(
            model_name='social',
            name='icon',
            field=faicon.fields.FAIconField(blank=True, max_length=50, null=True),
        ),
    ]
