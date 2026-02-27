#Serializer converts Django Model → JSON

from rest_framework import serializers

from .models import Alert, Disaster, NotificationSubscription


class DisasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disaster
        fields = "__all__"

    def validate_severity_level(self, value: int) -> int:
        """
        Ensure severity stays within a realistic, bounded range.
        """
        if not 1 <= value <= 10:
            raise serializers.ValidationError(
                "Severity level must be between 1 (lowest) and 10 (highest)."
            )
        return value


class AlertSerializer(serializers.ModelSerializer):
    # Expose convenient, frontend-friendly fields derived from the related disaster
    title = serializers.CharField(source="disaster.title", read_only=True)
    location = serializers.CharField(source="disaster.location", read_only=True)
    level = serializers.CharField(source="alert_level", read_only=True)

    class Meta:
        model = Alert
        fields = ["id", "title", "location", "level", "message", "created_at"]


class NotificationSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationSubscription
        fields = [
            "id",
            "email",
            "phone",
            "push_subscription",
            "wants_email",
            "wants_sms",
            "wants_push",
            "min_level",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        email = attrs.get("email")
        phone = attrs.get("phone")
        push = attrs.get("push_subscription")

        if not email and not phone and not push:
            raise serializers.ValidationError(
                "Provide at least one contact method: email, phone, or push_subscription."
            )

        wants_email = attrs.get("wants_email", True)
        wants_sms = attrs.get("wants_sms", False)
        wants_push = attrs.get("wants_push", False)

        if wants_email and not email:
            raise serializers.ValidationError("Email is required when wants_email is true.")
        if wants_sms and not phone:
            raise serializers.ValidationError("Phone is required when wants_sms is true.")
        if wants_push and not push:
            raise serializers.ValidationError(
                "push_subscription is required when wants_push is true."
            )

        return attrs
