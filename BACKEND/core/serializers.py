#Serializer converts Django Model → JSON

from rest_framework import serializers

from .models import Alert, Disaster


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
