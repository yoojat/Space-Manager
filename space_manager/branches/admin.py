from django.contrib import admin
from . import models

@admin.register(models.Branch)
class BranchAdmin(admin.ModelAdmin):
    pass

@admin.register(models.BranchConfig)
class BranchConfig(admin.ModelAdmin):
    pass

