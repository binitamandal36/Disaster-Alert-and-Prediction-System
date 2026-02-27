import json
import os
from typing import Any, Dict, Optional, Tuple

from django.conf import settings
from django.core.mail import send_mail

from .models import NotificationSubscription


LEVEL_RANK = {"LOW": 1, "MEDIUM": 2, "HIGH": 3}


def _should_send(alert_level: str, min_level: str) -> bool:
    return LEVEL_RANK.get(alert_level, 999) >= LEVEL_RANK.get(min_level, 1)


def _build_alert_text(alert) -> Tuple[str, str]:
    title = alert.disaster.title
    location = alert.disaster.location
    level = alert.alert_level
    created = alert.created_at.strftime("%Y-%m-%d %H:%M")

    subject = f"[{level}] Disaster Alert: {title} ({location})"
    body = (
        f"Disaster Alert ({level})\n\n"
        f"Title: {title}\n"
        f"Location: {location}\n"
        f"Message: {alert.message}\n"
        f"Time: {created}\n\n"
        "Stay safe and follow official guidelines."
    )
    return subject, body


def _send_email(to_email: str, subject: str, body: str) -> None:
    send_mail(
        subject=subject,
        message=body,
        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
        recipient_list=[to_email],
        fail_silently=True,
    )


def _send_sms(to_phone: str, body: str) -> None:
    """
    Uses Twilio if installed + configured; otherwise logs to console.
    Env vars:
      - TWILIO_ACCOUNT_SID
      - TWILIO_AUTH_TOKEN
      - TWILIO_FROM_NUMBER
    """
    account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
    auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
    from_number = os.environ.get("TWILIO_FROM_NUMBER")

    if not (account_sid and auth_token and from_number):
        # Dev fallback
        print(f"[SMS:DEV] to={to_phone} body={body}")
        return

    try:
        from twilio.rest import Client  # type: ignore

        Client(account_sid, auth_token).messages.create(
            body=body,
            from_=from_number,
            to=to_phone,
        )
    except Exception:
        # Don't crash alert creation
        print(f"[SMS:ERROR] to={to_phone}")


def _send_web_push(subscription: Dict[str, Any], payload: Dict[str, Any]) -> None:
    """
    Uses pywebpush if installed + VAPID keys configured; otherwise logs to console.
    Env vars:
      - VAPID_PRIVATE_KEY
      - VAPID_CLAIMS_SUBJECT (e.g. mailto:you@example.com)
    """
    vapid_private_key = os.environ.get("VAPID_PRIVATE_KEY")
    vapid_subject = os.environ.get("VAPID_CLAIMS_SUBJECT", "mailto:admin@example.com")

    if not vapid_private_key:
        print(f"[PUSH:DEV] payload={payload}")
        return

    try:
        from pywebpush import webpush  # type: ignore

        webpush(
            subscription_info=subscription,
            data=json.dumps(payload),
            vapid_private_key=vapid_private_key,
            vapid_claims={"sub": vapid_subject},
        )
    except Exception:
        print("[PUSH:ERROR] failed to send")


def notify_subscribers(alert) -> None:
    """
    Best-effort notifications for all active subscribers.
    """
    subject, body = _build_alert_text(alert)

    subs = NotificationSubscription.objects.filter(is_active=True).order_by("-created_at")
    for sub in subs:
        if not _should_send(alert.alert_level, sub.min_level):
            continue

        if sub.wants_email and sub.email:
            _send_email(sub.email, subject, body)

        if sub.wants_sms and sub.phone:
            _send_sms(sub.phone, body)

        if sub.wants_push and sub.push_subscription:
            _send_web_push(
                subscription=sub.push_subscription,
                payload={
                    "title": subject,
                    "body": alert.message,
                    "level": alert.alert_level,
                    "location": alert.disaster.location,
                },
            )

