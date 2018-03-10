from django.conf.urls import url

from . import views

urlpatterns = [
    url(regex=r'^$', view=views.UserStatus.as_view(), name='user_status_self'),
    url(regex=r'^(?P<username>\w+)/password/$',
        view=views.ChangePassword.as_view(),
        name='change'),
    url(regex=r'^login/facebook/$',
        view=views.FacebookLogin.as_view(),
        name='fb_login'),
    url(regex=r'^(?P<username>\w+)/$',
        view=views.UserProfile.as_view(),
        name='user_profile_username'),
    url(regex=r'^id/(?P<userid>[0-9]+)/$',
        view=views.UserByID.as_view(),
        name='user_profile_userid'),
]
