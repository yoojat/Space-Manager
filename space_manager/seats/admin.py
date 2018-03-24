from django.contrib import admin
from . import models


@admin.register(models.Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = (
        'seat_number',
        'branch',
        'room',
    )

    list_per_page = 10

    search_fields = (
        'branch__branch_name',
        'seat_number',
    )

    list_filter = ('branch', )


@admin.register(models.Action)
class ActionAdmin(admin.ModelAdmin):
    pass


@admin.register(models.SeatImage)
class SeatImageAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Log)
class LogAdmin(admin.ModelAdmin):
    list_display = (
        'action',
        'user',
        'seat',
    )

    list_per_page = 10

    search_fields = ('user', )

    list_filter = ('seat__branch', )
