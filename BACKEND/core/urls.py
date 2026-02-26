from django.urls import path

from . import views
from .views import AlertListView

urlpatterns = [
    path("", views.home, name="home"),
    path("disasters/", views.disaster_list, name="disaster_list"),
    path("add/", views.add_disaster, name="add_disaster"),
    path("edit/<int:id>/", views.edit_disaster, name="edit_disaster"),
    path("delete/<int:id>/", views.delete_disaster, name="delete_disaster"),
    path("api/disasters/", views.disaster_api, name="disaster_api"),
    path("api/alerts/", AlertListView.as_view(), name="alerts"),
    # Admin authentication and dashboard APIs
    path("api/admin/login/", views.admin_login, name="admin_login"),
    path("api/admin/logout/", views.admin_logout, name="admin_logout"),
    path("api/admin/me/", views.admin_me, name="admin_me"),
    path(
        "api/admin/disasters/",
        views.AdminDisasterListCreate.as_view(),
        name="admin_disaster_list",
    ),
    path(
        "api/admin/disasters/<int:pk>/",
        views.AdminDisasterDetail.as_view(),
        name="admin_disaster_detail",
    ),
    path(
        "api/admin/alerts/",
        views.AdminAlertList.as_view(),
        name="admin_alerts",
    ),
]
