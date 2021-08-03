from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import OrderCreate, SpecialOrderDetail, promo_view, OrderUpdate, sber_callback_view


# router = DefaultRouter()
# router.register(r'orders', OrderCreate, basename='order')

urlpatterns = [
    path('promo/', promo_view, name='promo_view'),
    path('orders/', OrderCreate.as_view(), name='order_create'),
    path('orders/<orderId>/', OrderUpdate.as_view(), name='order_update'),
    path('specialorders/<pk>/', SpecialOrderDetail.as_view(), name='specialorder_detail'),
    path('sbercallbacks/', sber_callback_view, name='sbercallback_view'),
]

# urlpatterns += router.urls