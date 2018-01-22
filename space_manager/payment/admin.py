from django.contrib import admin
from . import models

@admin.register(models.PaymentHistory)
class PaymentHistoryAdmin(admin.ModelAdmin):
    list_display_links =(
       'created_at',
    )

    search_fields = (
        'user__name',
    )

    list_display = (
        'created_at',
        'user',
        'cost_type',
        'cost_value',
        'payment_method',
    )


@admin.register(models.PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    pass


@admin.register(models.CostType)
class CostTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.EnrollType)
class EnrollTypeAdmin(admin.ModelAdmin):
    pass
