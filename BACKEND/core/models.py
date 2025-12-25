#This model stores disaster details with type, location, severity, and timestamp.
from django.db import models

class Disaster(models.Model):
    DISASTER_TYPES = [
        ('Flood', 'Flood'),
        ('Earthquake', 'Earthquake'),
        ('Landslide', 'Landslide'),
        ('Fire', 'Fire'),
        ('Cyclone', 'Cyclone'),
    ]

    title = models.CharField(max_length=200)
    disaster_type = models.CharField(max_length=50, choices=DISASTER_TYPES)
    location = models.CharField(max_length=200)
    severity_level = models.IntegerField(help_text="1 (Low) to 5 (High)")
    description = models.TextField()
    date_reported = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.location}"
