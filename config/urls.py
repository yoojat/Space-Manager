from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from rest_framework_jwt.views import obtain_jwt_token
from space_manager import views

urlpatterns = [
    # Django Admin, use {% url 'admin:index' %}
    url(settings.ADMIN_URL, admin.site.urls),

    # User management
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^seats/', include('space_manager.seats.urls', namespace='seats')),
    url(r'^rooms/', include('space_manager.rooms.urls', namespace='rooms')),
    url(r'^users/', include('space_manager.users.urls', namespace='users')),
    url(r'^cabinets/',
        include('space_manager.cabinets.urls', namespace='cabinets')),
    url(r'^membership/',
        include('space_manager.membership.urls', namespace='membership')),
    url(r'^branch/',
        include('space_manager.branches.urls', namespace='branches')),
    url(r'^payment/',
        include('space_manager.payment.urls', namespace='payments')),
    url(r'^qrcodes/', include(
        'space_manager.qrcodes.urls', namespace='qrcodes')),
    # url(r'^accounts/', include('allauth.urls')),
    # url(r'^', views.ReactAppView.as_view()),

    # Your stuff: custom urls includes go here
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += [
#     url(r'^', views.ReactAppView.as_view()),
# ]
if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$',
            default_views.bad_request,
            kwargs={
                'exception': Exception('Bad Request!')
            }),
        url(r'^403/$',
            default_views.permission_denied,
            kwargs={
                'exception': Exception('Permission Denied')
            }),
        url(r'^404/$',
            default_views.page_not_found,
            kwargs={
                'exception': Exception('Page not Found')
            }),
        url(r'^500/$', default_views.server_error),
    ]
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        import debug_toolbar
        urlpatterns = [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ] + urlpatterns
