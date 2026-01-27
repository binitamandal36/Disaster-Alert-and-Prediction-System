from django.urls import path
from .views import home, disaster_list
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('disasters/', views.disaster_list, name='disaster_list'),
    path('add/', views.add_disaster, name='add_disaster'),
    path('edit/<int:id>/', views.edit_disaster, name='edit_disaster'),
    path('delete/<int:id>/', views.delete_disaster, name='delete_disaster'),
    path('api/disasters/', views.disaster_api, name='disaster_api'),
]
