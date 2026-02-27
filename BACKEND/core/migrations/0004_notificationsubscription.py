from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_disaster_valid_until"),
    ]

    operations = [
        migrations.CreateModel(
            name="NotificationSubscription",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("email", models.EmailField(blank=True, max_length=254, null=True)),
                ("phone", models.CharField(blank=True, max_length=25, null=True)),
                ("push_subscription", models.JSONField(blank=True, null=True)),
                ("wants_email", models.BooleanField(default=True)),
                ("wants_sms", models.BooleanField(default=False)),
                ("wants_push", models.BooleanField(default=False)),
                (
                    "min_level",
                    models.CharField(
                        choices=[("LOW", "Low"), ("MEDIUM", "Medium"), ("HIGH", "High")],
                        default="LOW",
                        max_length=20,
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]

