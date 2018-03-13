from django.contrib import admin
from . import models


@admin.register(models.Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = (
        'branch_name',
        'branch_num',
        'region',
        'address',
        'detail_address',
    )

    search_fields = ('branch_name', 'branch_num')

    list_filter = ('region', )


@admin.register(models.BranchConfig)
class BranchConfig(admin.ModelAdmin):
    search_fields = ('branch__branch_name', 'branch__branch_num')

    list_filter = ('branch__region', )


@admin.register(models.BranchIp)
class BranchIpAdmin(admin.ModelAdmin):
    list_display = (
        'branch',
        'ip',
    )

    search_fields = (
        'branch__branch_name',
        'branch__branch_num',
    )

    list_filter = ('branch__region', )
