from django.contrib import admin
from django.db import models
from import_export.admin import ExportActionMixin, ImportExportActionModelAdmin
from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget
from django.utils.safestring import mark_safe
from .models import Order, Promo, Goods, SpecialOrder
from django.utils.encoding import force_str, smart_str
from utils.payments import set_deposited_or_reversed
from django.forms import CheckboxSelectMultiple

# Register your models here.


class PromoAdmin(admin.ModelAdmin):

    list_display = ['promo', 'expiration', 'discount', 'present', 'accessory', 'accessories',] 
    list_editable = ['expiration', 'discount', 'present', 'accessory', 'accessories', ]
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


class GoodsInline(admin.TabularInline):
    model = Goods
    readonly_fields = ('name', 'code', 'price','quantity', 'refunded', 'amount')
    fields =  ('name', 'code', 'price','quantity', 'refunded', 'amount')
    extra = 0
    can_delete = False
    verbose_name_plural = 'Корзина'
    max_num = 0

# class GoodsRefundedInline(admin.TabularInline):
#     model = GoodsRefunded
#     readonly_fields = ('name','price','quantity',)
#     fields =  ('name','price','quantity',)
#     extra = 0
#     can_delete = False
#     verbose_name_plural = 'Корзина с учетом возрата'
#     max_num = 0


class GoodsOrderWidget(ManyToManyWidget):

    def render(self, value, obj=None):
        data = [smart_str(f' {obj.code} - {obj.name} - {obj.quantity}шт - {obj.price}руб') for obj in value.all()]
        return self.separator.join(data)


class OrderResource(resources.ModelResource):
    goods = fields.Field(
                column_name='goods',
                attribute='goods',
                widget=GoodsOrderWidget(Goods,)
            )
    class Meta:
        model = Order
        exclude = ('id', 'checksum')

class OrderAdmin(ExportActionMixin, admin.ModelAdmin):
    resource_class = OrderResource
    readonly_fields = ('orderNumber', 'orderId', 'order_date', 'status', 'check', 'emailed', 'email', 'amount', 'promo', 'phone',)
    fieldsets = (
        (None, {
            'fields': ('orderNumber', 'orderId', 'order_date', 'status', 'check', 'emailed', 'phone', 'email', 'amount','promo', )
        }),
        ('Дополнительные сведения', {
            'fields': ('delivery_day','delivery_time','name', 'adress','comment', 'name2', 'phone2'),
        }),
    )
    list_filter = ('status', 'order_date','delivery_day','delivery_time')
    # list_editable = ('emailed',)
    list_display = ['orderNumber', 'orderId','status', 'check', 'emailed', 'goods_list','order_date','delivery_day','delivery_time','amount','name','adress','comment','promo',]
    
    inlines = [GoodsInline,]
    actions = ImportExportActionModelAdmin.actions + ['finalize_order',]
    

    def goods_list(self, obj):
        try:
            data = [smart_str(f' {goods.code} - {goods.name} - {goods.quantity}шт - {goods.price}руб') for goods in obj.goods.all()]
            return ',\n'.join(data)
        except:
            data = ''
        return data
    
    goods_list.short_description = 'Товары в заказе'

    def finalize_order(self, request, queryset):
        for obj in queryset:
            set_deposited_or_reversed(obj, "deposited", final=True)

    finalize_order.short_description = 'Закрыть выбранные заказы'
    
class SpecialOrderAdmin(admin.ModelAdmin):
    list_display = ('goods', 'price', 'quantity' ,'order_date',)
    readonly_fields = ('link', 'options',)
    fieldsets = (
        (None, {
            'fields': ('goods', 'delivery_option', 'price', 'quantity' ,'order_date',)
        }),
        ('Дополнительные сведения', {
            'fields': ('link', 'options',),
        }),
    )

    def options(self, obj):
        btn_id = 'copy-helper'
        return mark_safe(f"""
            <input text="text" id="{btn_id}" value="{obj.link}" style="position:absolute; top:-1000px;">
            <a href="#" onclick="document.querySelector(\'#{btn_id}\').select(); document.execCommand(\'copy\');" class="addlink">Копировать ссылку в буфер обмена</a>
            """
        )
    options.short_description = 'Options'


admin.site.register(Promo, PromoAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(SpecialOrder, SpecialOrderAdmin)