from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^all/$',
        view = views.ListAllMemberships.as_view(),
        name = 'all_membership'
    ),
    url(
        regex=r'^actions/$',
        view = views.ListAllActions.as_view(),
        name = 'all_actions'
    ),
    url(
        regex=r'^historys/$',
        view = views.ListAllMembershipHistory.as_view(),
        name = 'all_historys'
    ),
]