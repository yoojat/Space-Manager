from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^(?P<user_id>[0-9]+)/$',
        view=views.Payment.as_view(),
        name='Payment',
    ),
    url(
        regex=r'^costtype/$',
        view=views.CostType.as_view(),
        name='CostType',
    ),
    url(
        regex=r'^onlyyou/(?P<user_id>[0-9]+)/$',
        view=views.OnlyYou.as_view(),
        name='OnlyYou',
    ),
    url(
        regex=r'^basket/(?P<user_id>[0-9]+)/(?P<cost_type_id>[0-9]+)/$',
        view=views.Basket.as_view(),
        name='Basket',
    ),
    url(
        regex=r'^basket/(?P<user_id>[0-9]+)/$',
        view=views.Basket.as_view(),
        name='Basket',
    ),
    url(
        regex=r'^basket/item/(?P<item_id>[0-9]+)/$',
        view=views.BasketDetail.as_view(),
        name='BasketDetail',
    ),
]