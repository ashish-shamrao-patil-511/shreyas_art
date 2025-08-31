from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from portfolio import views
from rest_framework_simplejwt.views import (TokenRefreshView)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", views.health),
    path("api/artworks/", views.list_artworks),
    path("api/artworks/<int:art_id>/", views.get_artwork),
    path("api/blog/", views.list_blog),
    path("api/blog/<slug:slug>/", views.get_blog),
    path("api/admin/artworks/", views.create_artwork),
    path("api/admin/login/", views.admin_login),
    path("api/token/", views.AdminTokenObtainPairView.as_view(), name="admin_token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
