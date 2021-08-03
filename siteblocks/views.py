from django.db.models.query import Prefetch
from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from utils.deliverydate import get_delivery_date
from django.shortcuts import get_object_or_404
from .models import TitleBlock, IconBlock, Contact, Showcase, Accessory, Gallery, Info, AccessoryBlock
from flowersets.models import BouquetSetSize, Subscription, TestBoquet
from .serializers import HomePageSerializer


class Page(object):
    def __init__(self):
        pass

@api_view()
@permission_classes((permissions.AllowAny,))
def homepage_view(request):
    home = Page()
    home.titleblock = TitleBlock.objects.first()
    home.iconblock = IconBlock.objects.all()
    delivery_date = get_delivery_date()
    set_sizes = BouquetSetSize.objects.all().prefetch_related('images')
    subscriptions = Subscription.objects.prefetch_related(Prefetch('sets', queryset=set_sizes)).filter(is_active=True)
    # for size in set_sizes:
    #     size.images = BouquetImage.objects.filter(bouquet__in=bouquets).filter(bouquet_size=size.set_size).order_by('bouquet')
    home.titleblock = TitleBlock.objects.first()
    home.showcase  = Showcase.objects.first()
    home.showcase.subscriptions = subscriptions
    home.contact = Contact.objects.first()
    home.accessory_block = AccessoryBlock.objects.first()
    home.accessory_block.accessories = Accessory.objects.filter(is_active=True)
    home.gallery = Gallery.objects.first()
    home.infoblocks = Info.objects.all()
    home.test_boquets = TestBoquet.objects.filter(is_active=True)
    serializer = HomePageSerializer(home, context={'request': request})
    return Response(serializer.data)


# class InfoForOrderView(generics.RetrieveAPIView):
#     serializer_class = InfoForOderSerializer

#     def get_queryset(self):
#         return Info.objects.all()

#     def get_object(self):
#         delivery_date = get_delivery_date()
#         obj = get_object_or_404(self.get_queryset(), pk=self.kwargs['pk'])
#         set_sizes = BouquetSetSize.objects.all()
#         bouquets = Bouquet.objects.filter(release_date__gt=delivery_date)[:4]
#         for size in set_sizes:
#             size.images = BouquetImage.objects.filter(bouquet__in=bouquets).filter(bouquet_size=size.set_size).order_by('bouquet')
#         obj.set_sizes = set_sizes
#         obj.bouquets = bouquets
        
#         return obj