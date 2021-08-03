# Generated by Django 3.1.7 on 2021-06-21 19:12

from django.db import migrations, models
import flowersets.models


class Migration(migrations.Migration):

    dependencies = [
        ('flowersets', '0024_subscription_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestBoquet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True, verbose_name='Наименование')),
                ('image', models.ImageField(max_length=255, upload_to=flowersets.models.image_directory_path, verbose_name='Фото')),
                ('code', models.CharField(default='test-', max_length=60, unique=True, verbose_name='Артикул')),
                ('price', models.PositiveIntegerField(verbose_name='Цена')),
                ('button', models.CharField(blank=True, max_length=255, null=True, verbose_name='Надпись на кнопке')),
                ('is_active', models.BooleanField(default=True, verbose_name='На витрине')),
                ('order', models.PositiveIntegerField(blank=True, null=True, verbose_name='Порядок')),
            ],
            options={
                'verbose_name': 'Тестовый букет',
                'verbose_name_plural': 'Тестовые букеты',
                'ordering': ['order'],
            },
        ),
    ]
