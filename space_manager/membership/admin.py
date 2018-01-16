from django.contrib import admin
from . import models

@admin.register(models.Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display_links =(
       'created_at',
    )

    search_fields = (
        'user__name',
    )

    list_filter = (
        'branch__branch_name',
        'branch__branch_num',
    )

    list_display = (
        'created_at',
        'branch',
        'user',
        'start_date',
        'end_date',
        'is_usable',
        'creator',
        'updated_at',
    )

@admin.register(models.Action)
class ActionAdmin(admin.ModelAdmin):
    pass

@admin.register(models.MembershipHistory)
class MembershipHistoryAdmin(admin.ModelAdmin):
    list_display_links =(
       'created_at',
    )

    list_filter = (
        'branch__branch_name',
        'branch__branch_num',
    )

    list_display = (
        'created_at',
        'updated_at',
        'user',
        'start_date',
        'end_date',
        'branch',
        'action'
    )