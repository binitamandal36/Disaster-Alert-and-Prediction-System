#This model stores disaster details with type, location, severity, and timestamp.
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


class Incident(models.Model):
    name = models.CharField(max_length=100)
    disaster_type = models.CharField(max_length=50, choices=DISASTER_TYPES)
    location = models.CharField(max_length=200)
    description = models.TextField()
    reported_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.disaster_type}"
    
    def risk_level(self):
    if self.severity <= 3:
        return "LOW"
    elif self.severity <= 6:
        return "MEDIUM"
    else:
        return "HIGH"

