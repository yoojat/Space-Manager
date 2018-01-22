from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'(?P<user_id>[0-9]+)/enroll/',
        view = views.EnrollMembership.as_view(),
        name = 'Enroll_Membership',
    ),
]