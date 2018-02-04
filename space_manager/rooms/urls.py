from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^(?P<branch_id>[0-9]+)/$',
        view=views.Rooms.as_view(),
        name='Rooms',
    ),
    url(
        regex=r'^room/(?P<room_id>[0-9]+)/$',
        view=views.Room.as_view(),
        name='Room',
    ),
    url(
        regex=r'^types/$',
        view=views.RoomTypes.as_view(),
        name='RoomTypes',
    ),
]
