from django.urls import path

from . import views
from .views import AlertListView

urlpatterns = [
    path('', views.home, name='home'),
    path('disasters/', views.disaster_list, name='disaster_list'),
    path('add/', views.add_disaster, name='add_disaster'),
    path('edit/<int:id>/', views.edit_disaster, name='edit_disaster'),
    path('delete/<int:id>/', views.delete_disaster, name='delete_disaster'),
    path('api/disasters/', views.disaster_api, name='disaster_api'),
    path("api/alerts/", AlertListView.as_view(), name="alerts"),
    path("api/predict/", views.predict_risk, name="predict_risk"),
]
