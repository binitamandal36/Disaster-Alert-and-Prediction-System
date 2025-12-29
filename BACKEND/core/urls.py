from django.urls import path
from .views import home, disaster_list

urlpatterns = [
    path('', home, name='home'),
    path('disasters/', disaster_list, name='disaster_list'),
]
