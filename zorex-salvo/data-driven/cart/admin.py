from django.contrib import admin
from .models import Cart, Item


class ItemsInline(admin.TabularInline):
    extra = 1
    model = Item


class CartModelAdmin(admin.ModelAdmin):
    inlines = [ItemsInline]


admin.site.register(Cart, CartModelAdmin)
admin.site.register(Item)
