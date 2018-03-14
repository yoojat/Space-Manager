from django.conf.urls import url
from . import views

urlpatterns = [
    url(regex=r'^$', view=views.Branches.as_view(), name='branches'),
    url(regex=r'^(?P<branch_id>[0-9]+)/$',
        view=views.BranchDetail.as_view(),
        name='branch_detail'),
    url(regex=r'^search$', view=views.Search.as_view(), name='search_branch'),
    # url(regex=r'^ip/(?P<branch_ip>w+)/$',
    #     view=views.BracnhDetailByIp.as_view(),
    #     name='branch_by_ip'),
    # url(regex=r'^ip/(?P<branch_ip>[.a-z0-9]+)/$',
    #     view=views.BracnhDetailByIp.as_view(),
    #     name='branch_by_ip'),
    url(regex=r'^here/$',
        view=views.BranchIpAddress.as_view(),
        name='branch_ip'),
]
