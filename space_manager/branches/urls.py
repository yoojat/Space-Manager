from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.Branches.as_view(),
        name='branches'
    ),
    url(
        regex=r'^(?P<branch_id>[0-9]+)/$',
        view=views.BranchDetail.as_view(),
        name='branch_detail'
    ),

    url(
        regex=r'^search$',
        view=views.Search.as_view(),
        name='search_branch'
    ),
]
