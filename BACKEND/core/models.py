# This model stores disaster details with type, location, severity, and timestamp.
from django.db import models

DISASTER_TYPES = [
    ('Flood', 'Flood'),
    ('Earthquake', 'Earthquake'),
    ('Landslide', 'Landslide'),
    ('Fire', 'Fire'),
    ('Cyclone', 'Cyclone'),
]

class Disaster(models.Model):
    title = models.CharField(max_length=200)
    disaster_type = models.CharField(max_length=50, choices=DISASTER_TYPES)
    location = models.CharField(max_length=200)
    severity_level = models.IntegerField()
    description = models.TextField()
    date_reported = models.DateTimeField(auto_now_add=True)

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
    ALERT_LEVELS = (
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    )

    title = models.CharField(max_length=200)
    message = models.TextField()
    level = models.CharField(max_length=10, choices=ALERT_LEVELS)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.level}"