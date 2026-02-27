# This model stores disaster details with type, location, severity, and timestamp.
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

DISASTER_TYPES = [
    ("Flood", "Flood"),
    ("Earthquake", "Earthquake"),
    ("Landslide", "Landslide"),
    ("Fire", "Fire"),
    ("Cyclone", "Cyclone"),
    ("Tsunami", "Tsunami"),
    ("Drought", "Drought"),
    ("Storm", "Storm"),
    ("Avalanche", "Avalanche"),
    ("Volcano", "Volcano"),
    ("Heatwave", "Heatwave"),
]

class Disaster(models.Model):
    title = models.CharField(max_length=200)
    disaster_type = models.CharField(max_length=50, choices=DISASTER_TYPES)
    location = models.CharField(max_length=200)
    severity_level = models.IntegerField()
    description = models.TextField()
    date_reported = models.DateTimeField(auto_now_add=True)
    valid_until = models.DateField(
        null=True,
        blank=True,
        help_text="Date until which this disaster and its alerts are considered active.",
    )

    def __str__(self):
        return f"{self.title} - {self.location}"

    def risk_level(self):
        if self.severity_level <= 3:
            return "LOW"
        elif self.severity_level <= 6:
            return "MEDIUM"
        else:
            return "HIGH"

class Alert(models.Model):
    disaster = models.ForeignKey(
        Disaster,
        on_delete=models.CASCADE,
        related_name="alerts"
    )
    message = models.CharField(max_length=255)
    alert_level = models.CharField(
        max_length=20,
        choices=[
            ("LOW", "Low"),
            ("MEDIUM", "Medium"),
            ("HIGH", "High"),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.alert_level} alert for {self.disaster.title}"


class NotificationSubscription(models.Model):
    """
    Public users can subscribe to receive alert notifications via Email / SMS / Web Push.
    """

    MIN_LEVEL_CHOICES = [
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
    ]

    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=25, null=True, blank=True)
    push_subscription = models.JSONField(null=True, blank=True)

    wants_email = models.BooleanField(default=True)
    wants_sms = models.BooleanField(default=False)
    wants_push = models.BooleanField(default=False)

    min_level = models.CharField(max_length=20, choices=MIN_LEVEL_CHOICES, default="LOW")
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        label = self.email or self.phone or "push-only"
        return f"Subscription({label})"

@receiver(post_save, sender=Disaster)
def create_alert(sender, instance, created, **kwargs):
    if created:
        if instance.severity_level >= 7:
            level = "HIGH"
        elif instance.severity_level >= 4:
            level = "MEDIUM"
        else:
            level = "LOW"

        Alert.objects.create(
            disaster=instance,
            alert_level=level,
            message=f"{level} risk alert for {instance.title} in {instance.location}"
        )


@receiver(post_save, sender=Alert)
def notify_on_alert(sender, instance, created, **kwargs):
    """
    When a new alert is created, notify subscribers (best-effort).
    """
    if not created:
        return

    try:
        from .notifications import notify_subscribers

        notify_subscribers(instance)
    except Exception:
        # Never break alert creation if notifications fail.
        return
