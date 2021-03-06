# Generated by Django 3.1.7 on 2021-03-10 13:01

from django.db import migrations, models
import siteblocks.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TitleBlock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True, verbose_name='Заголовок')),
                ('subtitle', models.CharField(blank=True, max_length=255, null=True, verbose_name='Подзаголовок')),
                ('text', models.TextField(blank=True, null=True, verbose_name='Подзаголовок')),
                ('image', models.ImageField(max_length=255, upload_to=siteblocks.models.title_directory_path, verbose_name='Фоновое фото')),
            ],
            options={
                'verbose_name': 'Титульный блок',
            },
        ),
    ]
