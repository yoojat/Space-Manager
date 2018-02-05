from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^room/(?P<room_id>[0-9]+)/$',
        view=views.Seats.as_view(),
        name='Seats',
    ),
    url(
        regex=r'^seat/(?P<seat_id>[0-9]+)/$',
        view=views.Seat.as_view(),
        name='Seat',
    ),
    url(
        regex=r'^(?P<seat_id>[0-9]+)/allocation/$',
        view=views.Allocation.as_view(),
        name='Allocation',
    )
]
