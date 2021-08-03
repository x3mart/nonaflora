from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe
from .models import TitleBlock, IconBlock, Showcase, Contact, Phone, Social, Gallery, Accessory, Info, GalleryImage, AccessoryBlock


class InfoAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("short_title",)}


class GalleryForm(forms.ModelForm):
    images = forms.ImageField(label=u'Фотографии', widget=forms.FileInput(attrs={'multiple': 'multiple'}), required=False)

    class Meta:
        model = Gallery
        fields = '__all__'


class ImageInline(admin.StackedInline):
    model = GalleryImage
    readonly_fields = ('get_photo',)
    fields =  ('get_photo', 'is_active')
    extra = 0

    def get_photo(self, obj):
        if obj.image:
            return mark_safe(f'<a href={obj.image.url} target="_blank"><img src="{obj.get_tmb_url}" width="45"></a>')
        else:
            return '-'
    
    get_photo.short_description = 'Миниатюра'


class GalleryAdmin(admin.ModelAdmin):
    form = GalleryForm
    inlines = [
        ImageInline,
    ]

    def save_model(self, request, obj, form, change):
        obj.save()
        for f in request.FILES.getlist('images'):
            obj.images.create(image = f)



admin.site.register(TitleBlock)
admin.site.register(IconBlock)
admin.site.register(Showcase)
admin.site.register(Contact)
admin.site.register(Phone)
admin.site.register(Social)
admin.site.register(Gallery, GalleryAdmin)
admin.site.register(AccessoryBlock)
admin.site.register(Accessory)
admin.site.register(Info, InfoAdmin)
