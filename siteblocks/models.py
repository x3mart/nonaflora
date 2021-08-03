from django.db import models
from django.template.defaultfilters import slugify
from unidecode import unidecode
import os
from utils.image_crop import create_crop_wout_tmb, create_tmb, get_tmb_path
from phonenumber_field.modelfields import PhoneNumberField
from faicon.fields import FAIconField
from ckeditor.fields import RichTextField



def title_directory_path(instance, filename):
    name, extension = os.path.splitext(filename)
    folder = slugify(unidecode(instance.title))
    if len(folder) > 75:
        folder = folder[:75]
    return '{0}/{1}{2}'.format(folder, slugify(unidecode(name)), '.jpg')


class TitleBlock(models.Model):
    title = models.CharField(max_length=255, verbose_name='Заголовок', null=True, blank=True)
    subtitle = models.CharField(max_length=255, verbose_name='Подзаголовок', null=True, blank=True)
    text = RichTextField(verbose_name='Текст', null=True, blank=True)
    image = models.ImageField(max_length=255, verbose_name='Фоновое фото', upload_to=title_directory_path)
    button = models.CharField(max_length=55, verbose_name='Текст кнопки', null=True, blank=True)
    # image2 = models.ImageField(max_length=255, verbose_name='Картинка/лого', upload_to=title_directory_path)

    class Meta:
        verbose_name='Титульный блок'
    
    def __str__(self):
         return self.title
    
    # def save(self, *args, **kwargs):
    #     super(TitleBlock, self).save()
    #     create_crop_wout_tmb(self, 1920, 750)


class IconBlock(models.Model):
    icon = models.FileField(max_length=255, verbose_name='Изображение')
    bg_image = models.FileField(max_length=255, verbose_name='Подложка', null=True, blank=True)
    title = models.CharField(max_length=255, verbose_name='Заголовок', null=True, blank=True)
    text = RichTextField(verbose_name='Текст', null=True, blank=True)
    order = models.PositiveIntegerField(verbose_name='Порядок расположения', null=True, blank=True)

    class Meta:
        verbose_name='Иконка'
        verbose_name_plural='Блок иконок'
        ordering = ['order']
    
    def __str__(self):
         return self.title


class AccessoryBlock(models.Model):
    title = models.CharField(max_length=255, verbose_name='Заголовок')
    text = RichTextField(verbose_name='Текст', null=True, blank=True)

    class Meta:
        verbose_name='Блок доп товар'
        verbose_name_plural='Блок доп товары'
        ordering = ['id']
    
    def __str__(self):
         return self.title


class Showcase(models.Model):
    title = models.CharField(max_length=255, verbose_name='Заголовок', null=True, blank=True)
    subtitle = models.CharField(max_length=255, verbose_name='Подзаголовок', null=True, blank=True)
    description = RichTextField(verbose_name='Описание', null=True, blank=True)
    recomendation = RichTextField(verbose_name='Рекомендации по уходу', null=True, blank=True)
    buy_button = models.CharField(max_length=55, verbose_name='Кнопка (надпись)', null=True, blank=True)

    class Meta:
        verbose_name='Витрина'
        verbose_name_plural='Витрины'
        ordering = ['id']
    
    def __str__(self):
         return self.title



class Contact(models.Model):
    name = models.CharField(max_length=150, verbose_name='Название')
    address = models.CharField(max_length=255, verbose_name='Адрес')
    email = models.EmailField()
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Контакт'
        verbose_name_plural = 'Контакты'

    def __str__(self):
         return self.name


class Phone(models.Model):
    phone = PhoneNumberField(null=True, blank=True, verbose_name='Телефон')
    contact = models.ForeignKey('Contact', related_name='phones', on_delete=models.PROTECT, null=True, blank=True, verbose_name='Контакты')

    class Meta:
        verbose_name = 'Телефон'
        verbose_name_plural = 'Телефоны'


class Social(models.Model):
    icon = FAIconField(null=True, blank=True)
    name = models.CharField(max_length=150, verbose_name='Название')
    link = models.URLField(verbose_name='Ссылка')
    contact = models.ForeignKey('Contact', related_name='socials', on_delete=models.PROTECT, null=True, blank=True, verbose_name='Контакты')

    class Meta:
        verbose_name = 'Соцсеть'
        verbose_name_plural = 'Соцсети'

    def __str__(self):
         return self.name


class Gallery(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    is_active = models.BooleanField(default=True, verbose_name='Показывать?')

    def __str__(self):
         return self.title

    class Meta:
        verbose_name = 'Галлерея'
        verbose_name_plural = 'Галлереи'


class GalleryImage(models.Model):
    image = models.ImageField(max_length=255, verbose_name='Фото')
    is_active = models.BooleanField(default=True, verbose_name='Показывать?')
    gallery = models.ForeignKey('Gallery', on_delete=models.CASCADE, related_name='images')

    class Meta:
        verbose_name = 'Фото'
        verbose_name_plural = 'Фотографии'
    
    def save(self, *args, **kwargs):
        super(GalleryImage, self).save()
        if not os.path.isfile(get_tmb_path(self)):
            create_tmb(self, 300, 400)
            create_crop_wout_tmb(self, 600, 800)
    
    @property
    def get_tmb_url(self):
        return get_tmb_path(self)

class Accessory(models.Model):
    title = models.CharField(max_length=255, verbose_name='Наименование')
    short_title = models.CharField(max_length=255, verbose_name='Краткое наименование', null=True, blank=True)
    code = models.CharField(max_length=60, verbose_name = 'Артикул', unique=True, default='acc-')
    image =  models.ImageField(max_length=255, verbose_name='Фото')
    price = models.PositiveIntegerField( verbose_name='Цена')
    description = RichTextField(verbose_name='Описание', null=True, blank=True)
    is_active = models.BooleanField(default=True, verbose_name='В продаже?')

    class Meta:
        verbose_name = 'Аксессуар'
        verbose_name_plural = 'Аксессуары'

    def __str__(self):
         return self.title


class Info(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    short_title = models.CharField(max_length=255, verbose_name='Краткое название')
    slug = models.SlugField()
    body = RichTextField(verbose_name='Текст', null=True, blank=True)
    ordering_number = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = 'Информационный блок'
        verbose_name_plural = 'Информационные блоки'
        ordering = ['ordering_number']

    def __str__(self):
         return self.title