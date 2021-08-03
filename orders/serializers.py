from siteblocks.serializers import AccessorySeryalizer
from rest_framework import serializers
import requests
import hmac
import hashlib
import json
from django.conf import settings
# from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.core.mail import send_mail
from .models import Order, Promo, Goods, SpecialOrder


class GoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        # fields = '__all__'
        exclude = ['order',]
        read_only_fields = ['orderNumber']


class OrderCreateSeryalizer(serializers.ModelSerializer):
    payment_url = serializers.CharField(read_only=True)
    def get_payment_data(self, order):
        items = []
        positionId = 1
        for goods in order.goods.all():
            item = {"positionId":positionId,"name": goods.name ,"quantity":{"value":goods.quantity,"measure":"шт"},"itemCode":goods.code,"itemPrice":goods.price*100,"itemAmount":goods.price*goods.quantity*100,"itemAttributes":{"attributes":[{"name":"paymentMethod", "value":"1"},{"name":"paymentObject", "value":"4"}]}}
            items.append(item)
            positionId += 1
        
        bundle = {"cartItems":{"items":items}}
        
        data = {
            "token":settings.SBER_SECRET_KEY,
            "orderNumber":order.orderNumber,
            "amount": order.amount*100,
            "returnUrl":"https://nonaflora.ru/success/",
            "failUrl":"https://nonaflora.ru/fail/",
            "dynamicCallbackUrl":"https://nonaflora.ru/api/sbercallbacks/",
            "orderBundle":json.dumps(bundle)
        }
        headers = {'ContentType': 'application/x-www-form-urlencoded'}
        url = 'https://securepayments.sberbank.ru/payment/rest/register.do'
        try:
            register = requests.get(url, params=data, headers=headers)
            return register.json()
        except:
            sber = {}
            sber['errorMessage'] = 'Сбербанк недоступен'
            sber['errorCode'] = 1000
            return sber

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['orderNumber', 'orderId', 'status']
    
    goods = GoodsSerializer(many=True)

    def create(self, validated_data):
        goods = validated_data.pop('goods')
        order = Order.objects.create(**validated_data)
        order.save()
        for goods_data in goods:
            item = Goods.objects.create(order=order, **goods_data)
            item.amount = item.price*item.quantity
            item.save()
        sber = self.get_payment_data(order)
        try: 
            if sber['errorCode']:
                order.payment_url = sber['errorMessage']
                order.status = 'ERROR: ' + sber['errorMessage']
                order.save()
                return order
        except:
            order.orderId = sber['orderId']
            order.status = 'CREATED'
            order.payment_url = sber['formUrl']
            order.save()
            return order


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['orderNumber', 'status']
        read_only_fields = ['orderNumber', 'status']
    
    def get_order_status(self, orderId):
        data = {
            "token":settings.SBER_SECRET_KEY,
            "orderId":orderId,
        }
        url = 'https://securepayments.sberbank.ru/payment/rest/getOrderStatusExtended.do'
        try:
            order = requests.get(url, params=data).json()
            return order
        except:
            return 'ERROR SB CONNECTION'

    
    def update(self, instance, validated_data):
        sended = 0
        orderId = instance.orderId
        order = self.get_order_status(orderId)
        if order['actionCode'] == 0:
            instance.status = 'Оплачено'
            subject = f'Подтверждение заказа № {instance.orderNumber}'
            order_data = {'order':instance, "goods":instance.goods.all()}
            message = render_to_string("confirmation_mail_text.html", order_data)
            message_html = render_to_string("confirmation_mail.html", order_data)
            sended = send_mail(subject, message, 'hello@nonaflora.ru',[instance.email, 'nonaflora.flowers@gmail.com'], html_message=message_html,)
            if sended:
                instance.emailed = True
        elif order['actionCode'] == -100:
            instance.status = 'Не было попыток оплаты'
        else:
            instance.status = order['actionCodeDescription']
        instance.save()
        return instance


class PromoSerializer(serializers.ModelSerializer):
    accessory = AccessorySeryalizer(read_only=True, many=False)
    sets = serializers.SerializerMethodField(method_name='get_sets')
    class Meta:
        model = Promo
        fields = '__all__'
    
    def get_sets(self, obj):
        return obj.sets.all().values('code', 'title', 'set_size')


class SberCallbackSerializer(serializers.Serializer):
    mdOrder = serializers.CharField()
    orderNumber= serializers.CharField()
    checksum = serializers.CharField(required=False)
    operation = serializers.CharField()
    status = serializers.IntegerField()



class SpecialOrderDetailSeryalizer(serializers.ModelSerializer):
    class Meta:
        model = SpecialOrder
        exclude = ['link']
