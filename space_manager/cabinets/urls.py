from django.conf.urls import url
from . import views

urlpatterns = [
    url(regex=r'^(?P<branch_id>[0-9]+)/$',
        view=views.CabinetSets.as_view(),
        name='cabinet_sets'),
    url(regex=r'^cabinetset/(?P<cabinet_set_id>[0-9]+)/$',
        view=views.CabinetSet.as_view(),
        name='cabinet_set'),
    url(regex=r'^cabinet/(?P<cabinet_id>[0-9]+)/$',
        view=views.Cabinet.as_view(),
        name='cabinet'),
    url(regex=r'^enroll/(?P<cabinet_id>[0-9]+)/user/(?P<user_id>[0-9]+)/$',
        view=views.Allocate.as_view(),
        name='enroll_cabinet'),
    url(regex=r'^usecab/(?P<usecab_id>[0-9]+)/$',
        view=views.CabinetMembership.as_view(),
        name='use_cabinet'),
    url(regex=r'^locks/(?P<branch_id>[0-9]+)/$',
        view=views.CabinetLock.as_view(),
        name='cabinet_locks'),
    url(regex=r'^lock/(?P<cablock_id>[0-9]+)/$',
        view=views.CabinetLockDetail.as_view(),
        name='cabinet_lock'),
]
