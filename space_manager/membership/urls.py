from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^enroll/(?P<user_id>[0-9]+)/$',
        view=views.EnrollMembershipBySuper.as_view(),
        name='Enroll_by_super',
    ),
    url(
        regex=r'^(?P<user_id>[0-9]+)/(?P<payment_id>[0-9]+)/enroll/$',
        view=views.EnrollMembership.as_view(),
        name='Enroll_Membership',
    ),
    url(
        regex=r'^(?P<user_id>[0-9]+)/$',
        view=views.GetMemberships.as_view(),
        name='Get_Membership_By_User',
    ),
    url(
        regex=r'^actions/$',
        view=views.GetActions.as_view(),
        name='Actions',
    ),
    url(
        regex=r'^modify/(?P<membership_id>[0-9]+)/$',
        view=views.EnrollMembershipBySuper.as_view(),
        name='Modify_Membership',
    ),
]
