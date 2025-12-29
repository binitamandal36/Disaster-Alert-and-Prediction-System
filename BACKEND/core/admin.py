from django.contrib import admin
from .models import Disaster, Incident

@admin.register(Disaster)
class DisasterAdmin(admin.ModelAdmin):
    list_display = ('title', 'disaster_type', 'location', 'severity_level', 'date_reported')
    list_filter = ('disaster_type', 'severity_level')
    search_fields = ('title', 'location')

@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):
    list_display = ('name', 'disaster_type', 'location', 'reported_at')
    search_fields = ('name', 'location')

