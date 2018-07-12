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
        regex=r'^allocation/(?P<seat_id>[0-9]+)/(?P<user_id>[0-9]+)/$',
        view=views.Allocation.as_view(),
        name='Allocation',
    ),
    url(
        regex=r'^return/(?P<seat_id>[0-9]+)/$',
        view=views.ReturnSeat.as_view(),
        name='Return',
    ),
    # url(
    #     regex=r'^user/(?P<user_id>[0-9]+)/return/$',
    #     view=views.ReturnSeat.as_view(),
    #     name='Return',
    # ),
    url(
        regex=r'^user/seat/$',
        view=views.NowUsing.as_view(),
        name='NowUsing',
    ),
    url(
        regex=r'^myseat/$',
        view=views.MySeat.as_view(),
        name='MySeat',
    ),
]
