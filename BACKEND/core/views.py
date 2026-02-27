from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import os

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .forms import DisasterForm
from .models import Alert, Disaster, DISASTER_TYPES, NotificationSubscription
from .serializers import AlertSerializer, DisasterSerializer, NotificationSubscriptionSerializer

from django.db.models import Q
from django.utils import timezone


class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    Session authentication class that skips DRF's built-in CSRF enforcement.
    We rely on Django's login/session and protect these endpoints by login only.
    """

    def enforce_csrf(self, request):
        return


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
        serializer.save()
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
    serializer_class = AlertSerializer

    def get_queryset(self):
        """
        Public alerts list: only show alerts whose associated disaster is still active
        (valid_until is today or in the future) or has no expiry set.
        """
        today = timezone.now().date()
        base_qs = Alert.objects.select_related("disaster")
        return (
            base_qs.filter(
                Q(disaster__valid_until__isnull=True)
                | Q(disaster__valid_until__gte=today)
            )
            .order_by("-created_at")
        )


@csrf_exempt
@api_view(["POST"])
@authentication_classes([])  # no DRF auth -> no CSRF enforcement here
@permission_classes([])
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
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAuthenticated])
def admin_logout(request):
    """
    Log out the currently authenticated admin user.
    """
    logout(request)
    return Response({"success": True}, status=200)


@api_view(["GET"])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([])
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


@method_decorator(csrf_exempt, name="dispatch")
class AdminDisasterListCreate(ListCreateAPIView):
    """
    Admin-only endpoint to list and create disasters.
    """

    queryset = Disaster.objects.all().order_by("-date_reported")
    serializer_class = DisasterSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [IsAuthenticated]


@method_decorator(csrf_exempt, name="dispatch")
class AdminDisasterDetail(RetrieveUpdateDestroyAPIView):
    """
    Admin-only endpoint to retrieve, update, or delete a single disaster.
    """

    queryset = Disaster.objects.all().order_by("-date_reported")
    serializer_class = DisasterSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [IsAuthenticated]


@method_decorator(csrf_exempt, name="dispatch")
class AdminAlertList(ListAPIView):
    """
    Admin-only view of alerts, ordered from newest to oldest.
    """

    queryset = Alert.objects.order_by("-created_at")
    serializer_class = AlertSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [IsAuthenticated]


# ---------------------------
# Public notifications APIs
# ---------------------------

@csrf_exempt
@api_view(["GET"])
@authentication_classes([])  # public
@permission_classes([])
def notifications_vapid_public_key(request):
    """
    Returns VAPID public key used for Web Push subscriptions.
    """
    return Response({"publicKey": os.environ.get("VAPID_PUBLIC_KEY")}, status=200)


@csrf_exempt
@api_view(["POST"])
@authentication_classes([])  # public
@permission_classes([])
def notifications_subscribe(request):
    """
    Subscribe to receive alert notifications via Email / SMS / Web Push.
    """
    serializer = NotificationSubscriptionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    data = serializer.validated_data
    email = data.get("email")
    phone = data.get("phone")

    # Upsert by email or phone when available (push-only subscriptions create new rows).
    if email:
        sub, _ = NotificationSubscription.objects.update_or_create(
            email=email, defaults=data
        )
    elif phone:
        sub, _ = NotificationSubscription.objects.update_or_create(
            phone=phone, defaults=data
        )
    else:
        sub = NotificationSubscription.objects.create(**data)

    return Response(NotificationSubscriptionSerializer(sub).data, status=201)


@csrf_exempt
@api_view(["POST"])
@authentication_classes([])  # public
@permission_classes([])
def notifications_unsubscribe(request):
    """
    Unsubscribe using email or phone.
    """
    email = (request.data.get("email") or "").strip() or None
    phone = (request.data.get("phone") or "").strip() or None

    if not email and not phone:
        return Response({"detail": "Provide email or phone to unsubscribe."}, status=400)

    qs = NotificationSubscription.objects.filter(is_active=True)
    if email:
        qs = qs.filter(email=email)
    if phone:
        qs = qs.filter(phone=phone)

    updated = qs.update(is_active=False)
    return Response({"success": True, "updated": updated}, status=200)
