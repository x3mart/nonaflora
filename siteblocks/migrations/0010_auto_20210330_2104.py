# Generated by Django 3.1.7 on 2021-03-30 18:04

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteblocks', '0009_auto_20210330_1249'),
    ]

    operations = [
        migrations.CreateModel(
            name='Accessory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Наименование')),
                ('image', models.ImageField(max_length=255, upload_to='', verbose_name='Фото')),
                ('price', models.PositiveIntegerField(verbose_name='Цена')),
                ('description', ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Описание')),
                ('is_active', models.BooleanField(default=True, verbose_name='В продаже?')),
            ],
            options={
                'verbose_name': 'Аксессуар',
                'verbose_name_plural': 'Аксессуары',
            },
        ),
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(max_length=255, upload_to='', verbose_name='Фото')),
                ('is_active', models.BooleanField(default=True, verbose_name='Показывать?')),
            ],
            options={
                'verbose_name': 'Фото',
                'verbose_name_plural': 'Галлерея',
            },
        ),
        migrations.CreateModel(
            name='Info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Название')),
                ('short_title', models.CharField(max_length=255, verbose_name='Краткое название')),
                ('slug', models.SlugField()),
                ('body', ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Текст')),
                ('ordering_number', models.PositiveIntegerField(default=1)),
            ],
            options={
                'verbose_name': 'Информационный блок',
                'verbose_name_plural': 'Информационные блоки',
                'ordering': ['ordering_number'],
            },
        ),
        migrations.AlterField(
            model_name='iconblock',
            name='text',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Текст'),
        ),
        migrations.AlterField(
            model_name='showcase',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='showcase',
            name='recomendation',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Рекомендации по уходу'),
        ),
        migrations.AlterField(
            model_name='titleblock',
            name='text',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Текст'),
        ),
    ]
