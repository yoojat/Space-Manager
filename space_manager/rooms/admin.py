from django.contrib import admin
from . import models


@admin.register(models.RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display_links = ('room_number', )

    list_filter = ('branch', )

    search_fields = (
        'branch__branch_name',
        'room_number',
    )

    list_display = (
        'branch',
        'room_number',
        'room_type',
        'width',
        'height',
        'left',
        'top',
        'usable',
    )
