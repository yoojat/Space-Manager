from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^all/$',
        view = views.ListAllBranches.as_view(),
        name = 'all_branch'
    ),
    url(
        regex=r'^configs/$',
        view = views.ListAllBranchConfigs.as_view(),
        name = 'all_branch_configs'
    ),
]