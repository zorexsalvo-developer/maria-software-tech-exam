from django.contrib import admin
from .models import Plan, Term


class TermsInline(admin.TabularInline):
    extra = 1
    model = Term


class PlanModelAdmin(admin.ModelAdmin):
    inlines = [TermsInline]


admin.site.register(Plan, PlanModelAdmin)
admin.site.register(Term)
