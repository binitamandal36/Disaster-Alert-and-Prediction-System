from django.contrib import admin
from .models import Disaster, Alert

@admin.register(Disaster)
class DisasterAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'disaster_type',
        'location',
        'severity_level',
        'date_reported'
    )
    list_filter = ('disaster_type', 'severity_level')
    search_fields = ('title', 'location')
    ordering = ('-date_reported',)


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = (
        'disaster',
        'alert_level',
        'created_at'
    )
    list_filter = ('alert_level',)
