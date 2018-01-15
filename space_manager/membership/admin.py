from django.contrib import admin
from . import models

@admin.register(models.Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display_links =(
       'user',
    )

    search_fields = (
        'created_at',

    )

    # list_filter = (
    #     'branch',
    #     'user'
    # )

    list_display = (
        'created_at',
        'updated_at',
        'user',
        'branch',
        'start_date',
        'end_date',
        'is_usable',
        'creator'
    )

@admin.register(models.Action)
class ActionAdmin(admin.ModelAdmin):
    pass

@admin.register(models.MembershipHistory)
class MembershipHistoryAdmin(admin.ModelAdmin):
    list_display = (
        'created_at',
        'updated_at',
        'user',
        'start_date',
        'end_date',
        'branch',
        'action'
    )