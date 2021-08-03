from django.db import models
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os
from utils.image_crop import image_directory_path

def category_directory_path(instance, filename):
    return 'category/{}'.format(image_directory_path(instance, filename))


def accessory_directory_path(instance, filename):
    return 'accessory/{}'.format(image_directory_path(instance, filename))


class Category(models.Model):
    name = models.CharField(max_length=60, verbose_name='Название категории')
    short_description = models.CharField(max_length=255, verbose_name='Краткое описание')
    image = models.ImageField(max_length=255, upload_to=category_directory_path)


class Accessory(models.Model):
    name = models.CharField(max_length=60, verbose_name='Название товара')
    code = models.CharField(max_length=60, verbose_name = 'Артикул')
    description = models.TextField(max_length=255, verbose_name='Описание')
    price = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Цена')
    category = models.ForeignKey('Category', on_delete=models.CASCADE, verbose_name='Категория')

    def __str__(self):
         return self.name


class AccessoryImage(models.Model):
    image = models.ImageField(max_length=255, upload_to=category_directory_path)
    accessory = models.ForeignKey('Accessory', on_delete=models.CASCADE, verbose_name='Товар')