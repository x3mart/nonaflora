from flowersets.models import BouquetSetSize, Subscription
from siteblocks.models import Accessory
from django.db import models
from datetime import date
import urllib
from phonenumber_field.modelfields import PhoneNumberField


class Order(models.Model):
    orderNumber = models.CharField(max_length=60, verbose_name = 'Номер заказа', null=True, blank=True,)
    orderId = models.CharField(max_length=255, verbose_name = 'Номер Сбер', null=True, blank=True,)
    order_date = models.DateField(auto_now_add=True, verbose_name = 'Создан')
    status = models.CharField(max_length=255, verbose_name = 'Статус', null=True, blank=True,)
    checksum = models.TextField(null=True, blank=True,)
    check = models.BooleanField(default=False, verbose_name = 'Чек')
    emailed  = models.BooleanField(default=False, verbose_name = 'Письмо')
    delivery_day = models.CharField(max_length=60, verbose_name = 'День доставки', null=True, blank=True,)
    delivery_time = models.CharField(max_length=60, verbose_name = 'Время доставки', null=True, blank=True,)
    amount = models.PositiveIntegerField(verbose_name = 'Сумма')
    name = models.CharField(max_length=60, verbose_name = 'Имя')
    name2 = models.CharField(max_length=60, verbose_name = 'Имя получателя', null=True, blank=True)
    email = models.EmailField(verbose_name = 'email', null=True, blank=True)
    phone = PhoneNumberField(max_length=60, verbose_name = 'Телефон')
    phone2 = PhoneNumberField(max_length=60, verbose_name = 'Телефон получателя', null=True, blank=True)
    adress = models.TextField(verbose_name = 'Адрес получателя')
    comment = models.TextField( null=True, blank=True, verbose_name = 'Пожелание')
    promo = models.CharField(max_length=60, verbose_name = 'Промокод', null=True, blank=True,)

    def __str__(self):
         return self.orderNumber

    class Meta:
        ordering =['-id']
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
    
    def save(self, *args, **kwargs):
        super(Order, self).save()
        if not self.orderNumber:
            self.orderNumber = f'NF-{date.today()}-{self.id + 253}'
            self.save()


class Promo(models.Model):
    promo = models.CharField(max_length=60, verbose_name = 'Промокод')
    expiration = models.DateField(default=date.today(), verbose_name = 'Дествителен до')
    discount = models.PositiveIntegerField(default=10, null=True, blank=True)
    present = models.CharField(max_length=255, verbose_name = 'Презент', null=True, blank=True)
    accessories = models.BooleanField(default=False, verbose_name = 'Аксессуары')
    accessory = models.ForeignKey(Accessory, on_delete=models.PROTECT, verbose_name='Аксессуар', related_name='promos', null=True, blank=True)
    sets = models.ManyToManyField(BouquetSetSize, verbose_name='Сеты', related_name='promos')
    # s_set = models.BooleanField(default=False, verbose_name = 'Размер S')
    # m_set = models.BooleanField(default=False, verbose_name = 'Размер M')
    # l_set = models.BooleanField(default=False, verbose_name = 'Размер L')

    def __str__(self):
         return self.promo

    class Meta:
        ordering =['-id']
        verbose_name = 'Промокод'
        verbose_name_plural = 'Промокоды'


# class PromoSet(models.Model):
#     sets = models.ManyToManyField(BouquetSetSize,  verbose_name='Сеты', related_name='promo_sets')
#     promo = models.ForeignKey(Promo,  verbose_name='Промокод', related_name='promo_sets', on_delete=models.CASCADE)


class Goods(models.Model):
    name = models.CharField(max_length=60, verbose_name = 'Название')
    code = models.CharField(max_length=60, verbose_name = 'Артикул', null=True, blank=True)
    price = models.PositiveIntegerField(verbose_name = 'Цена')
    refunded = models.FloatField(verbose_name = 'Возвращено', default=0)
    quantity = models.FloatField(verbose_name = 'Количество')
    amount = models.FloatField(verbose_name = 'Стоимость', null=True, blank=True)
    order = models.ForeignKey('Order', on_delete=models.PROTECT, related_name='goods', null=True, blank=True)


# class GoodsRefunded(models.Model):
#     name = models.CharField(max_length=60, verbose_name = 'Название')
#     code = models.CharField(max_length=60, verbose_name = 'Артикул', null=True, blank=True)
#     price = models.PositiveIntegerField(verbose_name = 'Цена')
#     quantity = models.PositiveIntegerField(verbose_name = 'Количество')
#     order = models.ForeignKey('Order', on_delete=models.PROTECT, related_name='goods_refunded', null=True, blank=True)

class SpecialOrder(models.Model):
    goods = models.CharField(max_length=255, verbose_name = 'Название', default='Индивидуальная подписка на месяц')
    delivery_option = models.BooleanField(default=False, verbose_name="Показывать время доставки?")
    code = models.CharField(max_length=60, verbose_name = 'Артикул', null=True, blank=True)
    price = models.PositiveIntegerField(verbose_name = 'Цена', null=True, blank=True)
    quantity = models.PositiveIntegerField(verbose_name = 'Количество', default=1)
    link = models.TextField(verbose_name = 'Ссылка', null=True, blank=True)
    order_date = models.DateField(default=date.today())

    def __str__(self):
         return self.goods

    class Meta:
        ordering =['-id']
        verbose_name = 'Спец заказ'
        verbose_name_plural = 'Спец заказы'
    
    def save(self, *args, **kwargs):
        if self.delivery_option:
            delivery = 1
        else:
            delivery = 0
        super(SpecialOrder, self).save()
        if not self.code:
            self.code = f'special-{str(date.today())}-{self.id}'
            self.link = f'https://nonaflora.ru/checkout?specialorder={self.id}&goods={urllib.parse.quote(self.goods)}&price={self.price}&quantity={self.quantity}&code={self.code}&delivery_option={delivery}'
            self.save()
