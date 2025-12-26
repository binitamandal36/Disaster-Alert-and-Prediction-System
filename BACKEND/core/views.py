from django.shortcuts import render
from .models import Disaster

def disaster_list(request):
    disasters = Disaster.objects.all().order_by('-date_reported')   
    return render(request, 'core/disaster_list.html', {
        'disasters': disasters
    })


#Disaster.objects.all(): Fetches all disaster records from DB
#order_by('-date_reported'): Shows latest disaster first
