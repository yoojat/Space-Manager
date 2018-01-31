from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^(?P<user_id>[0-9]+)/(?P<payment_id>[0-9]+)/enroll/$',
        view = views.EnrollMembership.as_view(),
        name = 'Enroll_Membership',
    ),
    url(
        regex= r'^actions/$',
        view = views.GetActions.as_view(),
        name = 'Actions',
    ),
    url(
        regex= r'^test/$',
        view = views.Test.as_view(),
        name = 'Test',
    ),
]