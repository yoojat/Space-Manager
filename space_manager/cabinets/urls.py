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
    url(regex=r'^locks/(?P<branch_id>[0-9]+)/$',
        view=views.CabinetLock.as_view(),
        name='cabinet_locks'),
    url(regex=r'^lock/(?P<cablock_id>[0-9]+)/$',
        view=views.CabinetLockDetail.as_view(),
        name='cabinet_lock'),
    url(regex=r'^using/(?P<user_id>[0-9])/$',
        view=views.CabinetByUser.as_view(),
        name='cabinet_by_user'),
    url(regex=r'^nowusing/(?P<user_id>[0-9])/$',
        view=views.CabinetsNowUsing.as_view(),
        name='cabinet_now_using'),
    url(regex=r'^branch/(?P<branch_id>[0-9]+)/$',
        view=views.BranchCabinetSets.as_view(),
        name='branch_cabinet_set'),
    url(regex=r'^my/$', view=views.MyCabinets.as_view(),
        name='my_cabinets'),  # ok
]
