from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'(?P<user_id>[0-9]+)/',
        view = views.Payment.as_view(),
        name = 'Payment',
    ),
]