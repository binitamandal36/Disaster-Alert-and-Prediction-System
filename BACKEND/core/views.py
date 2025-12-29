from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from .models import Disaster
from .serializers import DisasterSerializer


def home(request):
    return render(request, 'core/home.html')


def disaster_list(request):
    disasters = Disaster.objects.all()
    return render(request, 'core/disaster_list.html', {'disasters': disasters})

#Disaster.objects.all(): Fetches all disaster records from DB
#order_by('-date_reported'): Shows latest disaster first

@api_view(['GET'])
def disaster_api(request):
    disasters = Disaster.objects.all()
    serializer = DisasterSerializer(disasters, many=True)
    return Response(serializer.data)
