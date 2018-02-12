from django.contrib import admin
from . import models


@admin.register(models.QR)
class QRAdmin(admin.ModelAdmin):
    list_display_links = ('user', )

    search_fields = ('user__name', )

    list_display = ('user', 'end_date', 'qr_code_img', 'qr_str')


@admin.register(models.CheckInOut)
class CheckInOutAdmin(admin.ModelAdmin):
    list_display_links = ('qr', )

    search_fields = ('qr__user__name', )

    list_display = (
        'qr',
        'check_in_out',
    )
