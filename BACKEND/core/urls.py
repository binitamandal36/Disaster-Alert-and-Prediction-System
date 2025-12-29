from django.urls import path
from .views import home, disaster_list
from . import views

urlpatterns = [
    path('', home, name='home'),
    path('disasters/', disaster_list, name='disaster_list'),
    path('api/disasters/', views.disaster_api, name='disaster_api'),
]
