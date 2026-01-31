#Serializer converts Django Model → JSON

from rest_framework import serializers
from .models import Alert, Disaster

class DisasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disaster
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = "__all__"        
