from django.conf.urls import url

from . import views

urlpatterns = [
    url(regex=r'^(?P<username>\w+)/password/$',
        view=views.ChangePassword.as_view(),
        name='change'),
]
