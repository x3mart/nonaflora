from django.db import models
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os
from utils.image_crop import create_crop_wout_tmb, create_tmb, get_tmb_path


def image_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    folder = 'bouquet_images'
    if len(folder) > 75:
        folder = folder[:75]
    return '{0}/{1}{2}'.format(folder, slugify(unidecode(name)), '.jpg')

# class Bouquet(models.Model):
#     name = models.CharField(max_length=50, verbose_name='Название букета')
#     on_showcase = models.BooleanField(default=False)

#     class Meta:
#         verbose_name = 'Букет'
#         verbose_name_plural = 'Букеты'
#         ordering = ['on_showcase']
    
#     def __str__(self):
#         return self.name


class BouquetImage(models.Model):
    # class Size(models.TextChoices):
    #     S = 'S'
    #     M = 'M'
    #     L = 'L'
    
    image = models.ImageField(verbose_name='Фото', max_length=255, upload_to=image_directory_path)
    # bouquet_size = models.CharField(max_length=1, verbose_name='Размер', choices=Size.choices, default=Size.S, null=True, blank=True)
    # bouquet = models.ForeignKey('Bouquet', on_delete=models.CASCADE, verbose_name='Букет', related_name='images', null=True, blank=True)
    set = models.ForeignKey('BouquetSetSize', on_delete=models.CASCADE, verbose_name='Сет', related_name='images', null=True, blank=True)

    class Meta:
        verbose_name = 'Фото букета'
        verbose_name_plural = 'Фото букетов'
        # ordering = ['bouquet_size']
        order_with_respect_to = 'set'
        # unique_together = ['bouquet', 'bouquet_size']
    
    def __str__(self):
        return self.image.path
    
    def save(self, *args, **kwargs):
        super(BouquetImage, self).save()
        if not os.path.isfile(get_tmb_path(self)):
            create_tmb(self, 200, 200)
            create_crop_wout_tmb(self, 800, 800)
    
    # @property
    # def get_tmb_url(self):
    #     return get_tmb_path(self)
        

class BouquetSetSize(models.Model):
    class Size(models.TextChoices):
        S = 'S'
        M = 'M'
        L = 'L'

    set_size = models.CharField(max_length=1, verbose_name='Размер', choices=Size.choices, default=Size.S, null=True, blank=True)
    code = models.CharField(max_length=60, verbose_name = 'Артикул',  unique=True, default='set-')
    title = models.CharField(max_length=255, verbose_name='Наименование', null=True, blank=True)
    # short_title = models.CharField(max_length=255, verbose_name='Краткое аименование', null=True, blank=True)
    price = models.PositiveIntegerField(verbose_name='Цена')
    subscription = models.ForeignKey('Subscription', on_delete=models.CASCADE, verbose_name='Подписка', related_name='sets', null=True, blank=True)

    
    
    class Meta:
        verbose_name = 'Сет'
        verbose_name_plural = 'Сеты'
        ordering = ['-set_size', 'id']
    
    def __str__(self):
        if self.subscription:
            if self.set_size:
                return f'{self.subscription.title} - {self.set_size}'
            elif self.title:
                return self.subscription.title + " - " + self.title
            else:
                return self.subscription.title
        else:
            if self.set_size:
                return self.set_size
            elif self.title:
                return self.title
            else:
                return "-"
    
    # def save(self, *args, **kwargs):
    #     if self.set_size == 'S':
    #         self.position = 1
    #     elif self.set_size == 'M':
    #         self.position = 2
    #     else:
    #         self.position = 3
    #     super(BouquetSetSize, self).save(*args, **kwargs)

class Subscription(models.Model):
    title = models.CharField(max_length=255, verbose_name='Наименование', null=True, blank=True)
    subtitle = models.CharField(max_length=255, verbose_name='Дополнение к наименованию', null=True, blank=True)
    description = models.TextField(verbose_name='Описание', null=True, blank=True)
    button = models.CharField(max_length=255, verbose_name='Надпись на кнопке', null=True, blank=True)
    is_active = models.BooleanField(default=True, verbose_name='На витрине')
    order = models.PositiveIntegerField(verbose_name='Порядок', null=True, blank=True)

    class Meta:
        verbose_name = 'Подписка'
        verbose_name_plural = 'Подписки'
        ordering = ['order']
    
    def __str__(self):
        return self.title


class TestBoquet(models.Model):
    title = models.CharField(max_length=255, verbose_name='Наименование', null=True, blank=True)
    image = models.ImageField(verbose_name='Фото', max_length=255, upload_to=image_directory_path)
    code = models.CharField(max_length=60, verbose_name = 'Артикул',  unique=True, default='test-')
    price = models.PositiveIntegerField(verbose_name='Цена')
    button = models.CharField(max_length=255, verbose_name='Надпись на кнопке', null=True, blank=True)
    is_active = models.BooleanField(default=True, verbose_name='На витрине')
    order = models.PositiveIntegerField(verbose_name='Порядок', null=True, blank=True)


    class Meta:
        verbose_name = 'Тестовый букет'
        verbose_name_plural = 'Тестовые букеты'
        ordering = ['order']
    
    def __str__(self):
        return self.title