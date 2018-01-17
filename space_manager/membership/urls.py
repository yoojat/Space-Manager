from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^all/$',
        view = views.ListAllMemberships.as_view(),
        name = 'all_membership'
    )
]