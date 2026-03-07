import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import NotificationSubscription


@csrf_exempt
def subscribe(request):
    if request.method == "POST":
        data = json.loads(request.body)

        NotificationSubscription.objects.create(
            push_subscription=data,
            wants_push=True
        )

        return JsonResponse({"status": "subscribed"})