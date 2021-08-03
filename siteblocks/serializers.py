from rest_framework import serializers
from flowersets.models import BouquetSetSize, Subscription, TestBoquet
from .models import TitleBlock, IconBlock, Contact, Social, Phone, Showcase, Accessory, Gallery, GalleryImage, Info, AccessoryBlock
from utils.deliverydate import delivery_message


class TitleBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleBlock
        fields ='__all__'


class IconBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = IconBlock
        fields ='__all__'

class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        exclude =['contact']

class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        exclude =['contact']


class ContactSerializer(serializers.ModelSerializer):
    socials = SocialSerializer(many=True)
    phones = PhoneSerializer(many=True)
    class Meta:
        model = Contact
        fields =['name', 'address', 'email' ,'phones', 'socials']



class BouquetImageShowcaseSerializer(serializers.Serializer):
    image = serializers.ImageField(max_length=255)
    # tmb = serializers.SerializerMethodField()
    # bouquet = serializers.SerializerMethodField()

    # def get_bouquet(self, obj):
    #     return obj.bouquet.id
    
    # def get_tmb(self, obj):
    #     return self.context['request'].build_absolute_uri(obj.get_tmb_url)

# class BouquetSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Bouquet
#         fields = '__all__'


class SetSizeSerializer(serializers.ModelSerializer):
    images = BouquetImageShowcaseSerializer(many=True)
    class Meta:
        model = BouquetSetSize
        fields = ['set_size', 'title', 'price', 'code', 'images']

class SubsriptionSerializer(serializers.ModelSerializer):
    sets = SetSizeSerializer(many=True)
    class Meta:
        model = Subscription
        fields = '__all__'

class ShowcaseSerializer(serializers.ModelSerializer):
    subscriptions = SubsriptionSerializer(many=True)
    class Meta:
        model = Showcase
        fields = '__all__'


class AccessorySeryalizer(serializers.ModelSerializer):
    is_accessories = serializers.SerializerMethodField(read_only=True)

    def get_is_accessories(self, obj):
        return True
    class Meta:
        model = Accessory
        fields = '__all__'


class GalleryImageSeryalizer(serializers.ModelSerializer):
    tmb = serializers.SerializerMethodField()
    
    def get_tmb(self, obj):
        return self.context['request'].build_absolute_uri(obj.get_tmb_url)

    class Meta:
        model = GalleryImage
        fields = ['image', 'tmb']


class GallerySeryalizer(serializers.ModelSerializer):
    images = GalleryImageSeryalizer(many=True)
    class Meta:
        model = Gallery
        fields = ['title', 'images']


class InfoblocksSeryalizer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'

class AccessoryBlockSerializer(serializers.ModelSerializer):
    accessories = AccessorySeryalizer(many=True)
    class Meta:
        model = AccessoryBlock
        fields = ['title', 'text', 'accessories']


class TestBoquetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestBoquet
        fields = '__all__'


class HomePageSerializer(serializers.Serializer):
    titleblock = TitleBlockSerializer(many=False)
    iconblock = IconBlockSerializer(many=True)
    showcase = ShowcaseSerializer(many=False)
    test_boquets = TestBoquetSerializer(many=True)
    contact = ContactSerializer(many=False)
    accessory_block = AccessoryBlockSerializer(many=False)
    gallery = GallerySeryalizer(many=False)
    infoblocks = InfoblocksSeryalizer(many=True)


# class InfoForOderSerializer(serializers.ModelSerializer):
#     bouquets = BouquetSerializer(many=True)
#     set_sizes = SetSizeSerializer(many=True)
#     delivery_message = serializers.SerializerMethodField()

#     class Meta:
#         model = Info
#         fields = '__all__'
    
#     def get_delivery_message(self, obj):
#         return delivery_message()
