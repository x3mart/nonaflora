import requests
from django.utils import timezone, dateformat
from datetime import datetime
import requests
from django.conf import settings
# from orders.models import GoodsRefunded

def set_refunded(order):
    order_data = {
                    "token":settings.SBER_SECRET_KEY,
                    "orderId":order.orderId,
                }
    url = 'https://securepayments.sberbank.ru/payment/rest/getOrderStatusExtended.do'
    order_status = requests.get(url, params=order_data).json()
    cart_items = order_status['orderBundle']['cartItems']['items']
    goods = order.goods.all()
    inventPositions = []
    refunded_sum = 0
    for item in cart_items:
            goods_item = goods.filter(code=item['itemCode']).first()
            quantity = item['quantity']['value']
            if quantity < goods_item.quantity:               
                inventPositions += [{
                    'name':item['name'],
                    'code':item['itemCode'],
                    'price':goods_item.price,
                    'quantity':goods_item.quantity - quantity,
                    'vatTag':1105,
                    "paymentObject":"commodity",
                    "paymentMethod":"full_payment"
                }]
                refunded_sum = refunded_sum + goods_item.amount - item['itemAmount']/100
                goods_item.refunded=goods_item.refunded + (goods_item.amount - item['itemAmount']/100)
                goods_item.amount=item['itemAmount']/100
                goods_item.quantity=quantity
                goods_item.save()
    check = {
        "docNum": order.orderNumber,
        "id": order.orderId + datetime.strftime(timezone.now(), 'H%M%S%f'),
        "docType": "RETURN",
        "checkoutDateTime": datetime.strftime(timezone.now(), '%Y-%m-%dT%H:%M:%S.%f%z'),
        "email": order.email,
        "inventPositions":inventPositions,
        "moneyPositions":[
            {
                "paymentType":"CARD",
                "sum":round(refunded_sum, 2)
            }
        ]
    }
    check_status = requests.post('https://service.modulpos.ru/api/fn/v2/doc', json=check, auth=(settings.MODULPOS_LOGIN, settings.MODULPOS_PASS)).json()
    if check_status['status'] == 'QUEUED':
        order.check = True
    else:
        order.check = False
    order.amount = order_status['paymentAmountInfo']['depositedAmount']/100
    order.save()
    return check

    
def set_deposited_or_reversed(order, operation, final=False):
    order_data = {
                    "token":settings.SBER_SECRET_KEY,
                    "orderId":order.orderId,
                }
    url = 'https://securepayments.sberbank.ru/payment/rest/getOrderStatusExtended.do'
    order_status = requests.get(url, params=order_data).json()
    cart_items = order_status['orderBundle']['cartItems']['items']
    goods = order.goods.all()
    inventPositions = []
    method="full_payment"
    payment_type = "CARD"
    if final:
        payment_type = "PREPAID"
    if operation == 'deposited':
        doc_type = 'SALE'
        if not final:
            method="full_prepayment"
    if operation == 'reversed':
        doc_type = 'RETURN'
    for item in goods:              
        inventPositions += [{
            'name':item.name,
            'code':item.code,
            'price':item.price,
            'quantity':item.quantity,
            'vatTag':1105,
            "paymentObject":"commodity",
            "paymentMethod":method
        }]
    check = {
        "docNum": order.orderNumber,
        "id": order.orderId + datetime.strftime(timezone.now(), 'H%M%S%f'),
        "docType": doc_type,
        "checkoutDateTime": datetime.strftime(timezone.now(), '%Y-%m-%dT%H:%M:%S.%f%z'),
        "email": order.email,
        "inventPositions":inventPositions,
        "moneyPositions":[
            {
                "paymentType":payment_type,
                "sum":order.amount
            }
        ]
    }
    check_status = requests.post('https://service.modulpos.ru/api/fn/v2/doc', json=check, auth=(settings.MODULPOS_LOGIN, settings.MODULPOS_PASS)).json()
    if check_status['status'] == 'QUEUED':
        order.check = True
        order.checksum = 'WOW'
    else:
        order.check = False
        order.checksum = check_status['error'] + ' - ' + check_status['message']
    if operation == 'reversed':
        order.amount = 0
    if final:
        order.status='закрыт'
    elif not final and operation == 'deposited':
        order.status = 'оплачено'
    order.save()
    return order
