from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.generics import ListAPIView
from django.core.mail import send_mail

from .forms import DisasterForm
from .models import Alert, Disaster, DISASTER_TYPES
from .serializers import AlertSerializer, DisasterSerializer


def home(request):
    return render(request, 'core/home.html')


def disaster_list(request):
    disasters = Disaster.objects.all()
    return render(request, 'core/disaster_list.html', {'disasters': disasters})

@api_view(['GET', 'POST'])
def disaster_api(request):
    """
    GET  -> Return list of all recorded disasters (latest first).
    POST -> Create a new disaster entry and trigger any related alerts.
    """
    if request.method == "GET":
        disasters = Disaster.objects.all().order_by("-date_reported")
        serializer = DisasterSerializer(disasters, many=True)
        return Response(serializer.data, status=200)

    serializer = DisasterSerializer(data=request.data)

    if serializer.is_valid():
        disaster = serializer.save()

        if disaster.severity_level >= 7:
            send_mail(
                subject="HIGH RISK DISASTER ALERT",
                message=(
                    "High Risk Disaster Reported!\n\n"
                    f"Title: {disaster.title}\n"
                    f"Location: {disaster.location}\n"
                    f"Severity: {disaster.severity_level}\n\n"
                    "Please stay alert and follow safety guidelines."
                ),
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


@api_view(["POST"])
def predict_risk(request):
    """
    Lightweight prediction endpoint.

    Accepts basic context about a potential disaster scenario and returns
    a computed risk level and human-readable advice without storing data.

    Expected payload:
    {
        "disaster_type": "Flood" | "Earthquake" | "Landslide" | "Fire" | "Cyclone",
        "location": "Some place",
        "severity_level": 1-10
    }
    """
    data = request.data or {}

    disaster_type = data.get("disaster_type")
    location = data.get("location", "").strip()
    severity_raw = data.get("severity_level")

    valid_types = {choice for choice, _ in DISASTER_TYPES}
    if disaster_type not in valid_types:
        return Response(
            {"detail": "Invalid or missing disaster_type."},
            status=400,
        )

    try:
        severity = int(severity_raw)
    except (TypeError, ValueError):
        return Response(
            {"detail": "severity_level must be an integer between 1 and 10."},
            status=400,
        )

    if not 1 <= severity <= 10:
        return Response(
            {"detail": "severity_level must be between 1 (lowest) and 10 (highest)."},
            status=400,
        )

    if severity <= 3:
        risk_level = "LOW"
        advice = "Risk is currently low. Stay informed and monitor updates."
    elif severity <= 6:
        risk_level = "MEDIUM"
        advice = "Moderate risk. Prepare an emergency kit and review evacuation routes."
    else:
        risk_level = "HIGH"
        advice = (
            "High risk detected. Follow local authority guidance and be ready "
            "to evacuate if necessary."
        )

    response_payload = {
        "disaster_type": disaster_type,
        "location": location or "Not specified",
        "severity_level": severity,
        "risk_level": risk_level,
        "advice": advice,
    }

    return Response(response_payload, status=200)
