from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from datetime import date
import hmac
import hashlib
from utils.payments import set_refunded, set_deposited_or_reversed
from .models import Order, Promo, SpecialOrder
from .serializers import OrderCreateSeryalizer, PromoSerializer, OrderStatusSerializer, SberCallbackSerializer, SpecialOrderDetailSeryalizer


class OrderCreate(generics.CreateAPIView):
    serializer_class = OrderCreateSeryalizer
    permission_classes = [AllowAny]


class SpecialOrderDetail(generics.RetrieveAPIView):
    serializer_class = SpecialOrderDetailSeryalizer
    permission_classes = [AllowAny]
    queryset = SpecialOrder.objects.all()

class OrderUpdate(generics.UpdateAPIView):
    serializer_class = OrderStatusSerializer
    permission_classes = [AllowAny]
    lookup_field = 'orderId'
    queryset = Order.objects.all()

    # def perform_create(self, serializer):
    #     order = serializer.save()


@api_view()
@permission_classes((permissions.AllowAny,))
def promo_view(request):
    try:
        promo = Promo.objects.filter(promo__iexact=request.query_params.get('promo')).filter(expiration__gte=date.today()).first()
    except:
        return JsonResponse({'error':'Неверный запрос'})
    serializer = PromoSerializer(promo)
    return Response(serializer.data)


@api_view()
@permission_classes((permissions.AllowAny,))
def sber_callback_view(request):
    serializer = SberCallbackSerializer(data=request.query_params)
    if serializer.is_valid():
        data = serializer.validated_data
        checksum = data.pop('checksum')
        total_params =''
        for elem in sorted(data.items()):
            total_params += f'{elem[0]};{elem[1]};'
        total_params = str.encode(total_params, 'utf-8')
        secret_key = b'77bqrpn1h73o485r1960seqgn1'
        signature = hmac.new(secret_key, total_params, hashlib.sha256).hexdigest()
        if checksum.lower() == signature:
            order = Order.objects.filter(orderId=data['mdOrder']).first()
            order.checksum = 'checksum Ok'
            order.save()
            if data['status'] and data['operation'] == 'deposited':
                set_deposited_or_reversed(order, data['operation'])
            elif data['status'] and data['operation'] == 'reversed':
                order.status = 'отмена'
                set_deposited_or_reversed(order, data['operation'])
            elif data['status'] and data['operation'].lower() == 'refunded':
                order.status = 'возврат'
                set_refunded(order) 
            elif data['status'] and data['operation'] == 'declinedByTimeout':
                order.status = 'Не было попыток оплаты'
            else:
                order.status = data['operation']
            order.save()
            return Response({},status=200)
        else:
            return Response({},status=403)        
    else:
        return Response(serializer.errors,status=400)

    