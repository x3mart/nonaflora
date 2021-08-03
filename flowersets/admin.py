from django.contrib import admin, messages
from django.utils.translation import ngettext
from django.utils.safestring import mark_safe
from .models import BouquetImage, BouquetSetSize, Subscription, TestBoquet

   

class BouquetImageAdmin(admin.ModelAdmin):

    list_display = ['get_photo', 'set']
    list_display_links = ('get_photo', 'set')
    ordering = ['set']
    readonly_fields = ('get_photo',)
    fields = ('get_photo', 'image', 'set' )

    def get_photo(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.get_tmb_url}" width="45">')
        else:
            return '-'
    
    get_photo.short_description = 'Миниатюра'


class BouquetImageInline(admin.TabularInline):
    model = BouquetImage
    readonly_fields = ('get_photo',)
    fieldsets = ((None, {'fields':('get_photo', 'set', 'image')}),)
    extra = 4
    max_num=4

    def get_photo(self, obj):
        if obj.image:
            return mark_safe(f'<a href={obj.image.url} target="_blank"><img src="{obj.image.url}" width="45"></a>')
        else:
            return '-'
    
    get_photo.short_description = 'Миниатюра'

    # def get_extra(self, request, obj):
    #     try:
    #         return 3 - obj.images.count()
    #     except:
    #         return 3

class BouquetSetSizeAdmin(admin.ModelAdmin):
    list_display = ['get_name', 'subscription']
    readonly_fields = ('get_name',)
    inlines = [
        BouquetImageInline,
    ]

    def get_name(self, obj):
        if obj.set_size:
            return obj.set_size
        elif obj.title:
            return obj.title
        else:
            return "-"

# class BouquetAdmin(admin.ModelAdmin):
#     list_display = ['get_photo', 'name', 'on_showcase']
#     list_display_links = ('get_photo', 'name',)
#     # list_editable = ('on_showcase',)
#     ordering = ['-on_showcase']
#     save_on_top = True
#     actions = ['make_published']

#     def make_published(self, request, queryset):
#         if queryset.count() == 4:
#             Bouquet.objects.update(on_showcase=False)
#             updated = queryset.update(on_showcase=True)
#             self.message_user(request, ngettext(
#                 '%d Букет выставлен на витрину.',
#                 '%d Букета выставлено на витрину.',
#                 updated,
#             ) % updated, messages.SUCCESS)
#         else:
#             self.message_user(request, ngettext(
#                 'Необходимо выбрать 4 букета, а не %d',
#                 'Необходимо выбрать 4 букета, а не %d',
#                 queryset.count(),
#             ) % queryset.count(), messages.ERROR)

#     make_published.short_description = "Выставить на витрину"

#     def get_photo(self, obj):
#         try:
#             image = obj.images.filter(bouquet_size='L').first()
#             return mark_safe(f'<img src="{image.get_tmb_url}" width="45">')
#         except:
#             return '-'
    
#     inlines = [
#         BouquetImageInline,
#     ]


# admin.site.register(Bouquet, BouquetAdmin)
# admin.site.register(BouquetImage, BouquetImageAdmin)
admin.site.register(BouquetSetSize, BouquetSetSizeAdmin)
admin.site.register(Subscription)
admin.site.register(TestBoquet)