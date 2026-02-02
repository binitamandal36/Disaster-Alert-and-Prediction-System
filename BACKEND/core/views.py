from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from .models import Disaster
from .serializers import DisasterSerializer
from .forms import DisasterForm
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from .models import Alert
from .serializers import AlertSerializer
from django.core.mail import send_mail


def home(request):
    return render(request, 'core/home.html')


def disaster_list(request):
    disasters = Disaster.objects.all()
    return render(request, 'core/disaster_list.html', {'disasters': disasters})

#Disaster.objects.all(): Fetches all disaster records from DB
#order_by('-date_reported'): Shows latest disaster first

@api_view(['POST'])
def disaster_api(request):
    serializer = DisasterSerializer(data=request.data)

    if serializer.is_valid():
        disaster = serializer.save()

        if disaster.severity_level >= 7:
            send_mail(
                subject="🚨 HIGH RISK DISASTER ALERT",
                message=f"""
High Risk Disaster Reported!

Title: {disaster.title}
Location: {disaster.location}
Severity: {disaster.severity_level}

Please stay alert and follow safety guidelines.
""",
                from_email=None,
                recipient_list=["user@example.com"],
            )

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

def add_disaster(request):
    if request.method == 'POST':
        form = DisasterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('disaster_list')
    else:
        form = DisasterForm()

    return render(request, 'core/add_disaster.html', {'form': form})

def edit_disaster(request, id):
    disaster = get_object_or_404(Disaster, id=id)

    if request.method == 'POST':
        form = DisasterForm(request.POST, instance=disaster)
        if form.is_valid():
            form.save()
            return redirect('disaster_list')
    else:
        form = DisasterForm(instance=disaster)

    return render(request, 'core/edit_disaster.html', {'form': form})

def delete_disaster(request, id):
    disaster = get_object_or_404(Disaster, id=id)
    disaster.delete()
    return redirect('disaster_list')

class AlertListView(ListAPIView):
    queryset = Alert.objects.order_by('-created_at')
    serializer_class = AlertSerializer

def create_alert(severity, disaster_title):
    if severity <= 3:
        level = "LOW"
        message = "Low risk detected. Stay aware."
    elif severity <= 6:
        level = "MEDIUM"
        message = "Moderate risk. Be prepared."
    else:
        level = "HIGH"
        message = "High risk! Immediate attention required."

    Alert.objects.create(
        title=f"{disaster_title} Alert",
        message=message,
        level=level
    )    
