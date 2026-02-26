from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail

from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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


@csrf_exempt
@api_view(["POST"])
def admin_login(request):
    """
    Authenticate an admin user using Django's built-in auth system.
    On success, a session is created and can be reused by subsequent admin API calls.
    """
    username = (request.data.get("username") or "").strip()
    password = request.data.get("password") or ""

    if not username or not password:
        return Response(
            {"detail": "Username and password are required."},
            status=400,
        )

    user = authenticate(request, username=username, password=password)

    if user is None or not user.is_staff:
        return Response(
            {"detail": "Invalid credentials or not authorized as admin."},
            status=400,
        )

    login(request, user)
    return Response(
        {
            "username": user.username,
            "is_staff": user.is_staff,
        },
        status=200,
    )


@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_logout(request):
    """
    Log out the currently authenticated admin user.
    """
    logout(request)
    return Response({"success": True}, status=200)


@api_view(["GET"])
def admin_me(request):
    """
    Return basic information about the currently authenticated admin user.
    Used by the frontend to keep admin sessions in sync.
    """
    user = request.user
    if user.is_authenticated:
        return Response(
            {
                "isAuthenticated": True,
                "username": user.username,
                "is_staff": getattr(user, "is_staff", False),
            },
            status=200,
        )

    return Response({"isAuthenticated": False}, status=200)


class AdminDisasterListCreate(ListCreateAPIView):
    """
    Admin-only endpoint to list and create disasters.
    """

    queryset = Disaster.objects.all().order_by("-date_reported")
    serializer_class = DisasterSerializer
    permission_classes = [IsAuthenticated]


class AdminDisasterDetail(RetrieveUpdateDestroyAPIView):
    """
    Admin-only endpoint to retrieve, update, or delete a single disaster.
    """

    queryset = Disaster.objects.all().order_by("-date_reported")
    serializer_class = DisasterSerializer
    permission_classes = [IsAuthenticated]


class AdminAlertList(ListAPIView):
    """
    Admin-only view of alerts, ordered from newest to oldest.
    """

    queryset = Alert.objects.order_by("-created_at")
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
