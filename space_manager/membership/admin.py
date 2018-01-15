from django.contrib import admin
from . import models

@admin.register(models.Membership)
class MembershipAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Action)
class ActionAdmin(admin.ModelAdmin):
    pass

@admin.register(models.MembershipHistory)
class MembershipHistoryAdmin(admin.ModelAdmin):
    pass