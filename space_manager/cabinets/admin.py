from django.contrib import admin
from . import models


@admin.register(models.Cabinet)
class CabinetAdmin(admin.ModelAdmin):

    list_display_links = ('cabinet_number', )

    search_fields = ('cabinet_number', )

    list_filter = ('cabinet_set__branch', )

    list_display = ('id', 'cabinet_number', 'cabinet_set', 'xpos', 'ypos',
                    'is_clean', 'user')
    list_per_page = 10


@admin.register(models.CabinetSet)
class CabinetSetAdmin(admin.ModelAdmin):

    list_display_links = ('desc', )

    list_filter = (
        'branch__branch_name',
        'branch__branch_num',
    )

    list_display = (
        'desc',
        'branch',
    )


# @admin.register(models.UseCabinet)
# class UseCabinetAdmin(admin.ModelAdmin):

#     list_display_links = ('cabinet', )

#     search_fields = (
#         'user_name',
#         'user_username',
#     )

#     list_filter = ('cabinet__cabinet_set__branch', )

#     list_display = (
#         'cabinet',
#         'user',
#         'start_date',
#         'end_date',
#         'is_usable',
#     )


@admin.register(models.CabinetAction)
class CabinetActionAdmin(admin.ModelAdmin):

    list_display_links = (
        'substance',
        'kr_substance',
    )

    list_display = (
        'substance',
        'kr_substance',
    )


@admin.register(models.CabinetHistory)
class CabinetHistoryAdmin(admin.ModelAdmin):

    list_display_links = ('cabinet', )

    search_fields = (
        'user_name',
        'user_username',
    )

    list_filter = ('cabinet__cabinet_set__branch', )

    list_display = (
        'cabinet',
        'user',
        'start_date',
        'end_date',
        'cabinet_action',
    )


@admin.register(models.CabinetLock)
class CabinetLockAdmin(admin.ModelAdmin):

    list_display_links = ('lock_number', )

    search_fields = (
        'lock_number',
        'cabinet__cabinet_number',
    )

    list_filter = ('branch', )

    list_display = (
        'branch',
        'cabinet',
        'lock_number',
        'lock_password',
    )
