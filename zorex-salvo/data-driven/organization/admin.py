from django.contrib import admin
from .models import Organization

admin.site.site_header = 'Health Shop'
admin.site.register(Organization)
