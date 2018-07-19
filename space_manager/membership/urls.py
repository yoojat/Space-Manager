from django.conf.urls import url
from . import views

urlpatterns = [
    # url(
    #     regex=r'^enroll/(?P<user_id>[0-9]+)/$',
    #     view=views.EnrollMembershipBySuper.as_view(),
    #     name='Enroll_by_super',
    # ),
    # url(
    #     regex=r'^(?P<user_id>[0-9]+)/(?P<payment_id>[0-9]+)/enroll/$',
    #     view=views.EnrollMembership.as_view(),
    #     name='Enroll_Membership',
    # ),
    url(
        regex=r'^enroll/$',
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
    # 요청한 유저의 맴버쉽 정보를 불러옴(현재시간대에 있는 것만)
    url(
        regex=r'^my/$',
        view=views.GetMyMemberships.as_view(),
        name='Get_my_meberships',
    ),
    url(
        regex=r'^extend/$',
        view=views.ExtendMembership.as_view(),
        name='ExtendMembership',
    ),
    url(
        regex=r'^today/$',
        view=views.TodayMemberships.as_view(),
        name='TodayMemberships',
    ),
    url(
        regex=r'^bydate/$',
        view=views.MembershipsByDate.as_view(),
        name='MembershipsByDate',
    ),
    url(
        regex=r'^log/(?P<membership_id>[0-9]+)/$',
        view=views.RegistMembershipLog.as_view(),
        name='RegistMembershipLog',
    ),
]
