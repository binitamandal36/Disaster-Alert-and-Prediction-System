# Disaster Alert and Prediction System

College project for BCA 6th semester showing how a simple **early warning and disaster alert system** can work using a Django REST backend and a React + Tailwind frontend.

---

## Tech Stack

- **Backend**
  - Python, Django, Django REST Framework
  - SQLite (development database)
  - `NotificationSubscription` model with Email + SMS (+ optional Web Push) notifications
- **Frontend**
  - React (Create React App)
  - React Router
  - Tailwind CSS
- **Notifications**
  - Email via SMTP (Gmail app password recommended for demo)
  - SMS via Twilio (optional, if you configure credentials)
  - Web Push (optional, via `pywebpush` + VAPID keys)

---

## How the system works (high level)

1. **Admin logs in** to the React admin dashboard (session-based Django auth).
2. Admin **creates or updates a Disaster** entry (type, location, severity, description, optional `valid_until` date).
3. A Django signal automatically **creates an Alert** with level `LOW`, `MEDIUM`, or `HIGH` based on severity.
4. The public React site:
   - Shows a **live banner** on the Home page.
   - Lists all current alerts on the **Alerts** page (only for disasters that are still active).
5. Public users can **subscribe** with email and/or phone number. When new alerts are created, the backend:
   - Sends **Email** notifications via Django’s `send_mail`.
   - Sends **SMS** via Twilio if configured.

Backend model of subscriptions is `core.NotificationSubscription`, and it is visible in the Django admin under **“Notification subscriptions”**.

---

## Running the project locally

### 1. Backend (Django)

From the `BACKEND` folder:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # for Django admin (optional but useful)
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.

### 2. Frontend (React)

From the `FRONTEND/frontend` folder:

```bash
npm install
npm start
```

React runs on `http://localhost:3000/` and is pre-configured to call the backend at `http://localhost:8000/api`.

---

## Pages overview (frontend)

- **Home** – product-style landing page
  - Hero section with project summary and CTAs.
  - Key benefits cards.
  - “Why build a warning system” section.
  - “How it works” steps.
  - “Get Notifications” box to subscribe by Email / SMS.
- **Disasters** – dashboard-style list of all disasters with filters and risk badges.
- **Alerts** – list of generated alerts with coloured cards and an optional “highlight by location” search box.
- **About** – explains the project and technologies.
- **Contact** – Telegrafia-style contact page with form + contact details.
- **Admin Login / Admin Dashboard** – for operators to manage disasters and view alerts.

---

## Email configuration for demo (Gmail)

In `BACKEND/disaster_alert/settings.py`, the email section is already wired to use SMTP:

```python
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "yourgmail@gmail.com"
EMAIL_HOST_PASSWORD = "your_app_password_here"
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
```

For a real demo:

1. Enable **2‑Step Verification** on your Google account.
2. Create an **App Password** for “Mail”.
3. Replace `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` with your Gmail and the app password.
4. Restart `python manage.py runserver`.

Whenever a new `Alert` is created, the backend will log lines like:

```text
[EMAIL] sent to=test@example.com subject='[HIGH] Disaster Alert: ...'
```

If something goes wrong, you will see:

```text
[EMAIL:ERROR] to=test@example.com error=...
```

---

## SMS configuration (optional)

To enable SMS via Twilio:

1. Create a Twilio account and get:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_FROM_NUMBER`
2. Set them as environment variables before running Django.

The backend will then send SMS for each alert using the phone numbers stored in `NotificationSubscription`.  
If these variables are missing, SMS are printed to the console as:

```text
[SMS:DEV] to=+1234567890 body=...
```

---

## Viva / demo flow

1. **Show architecture briefly**
   - Explain backend (Django + DRF), frontend (React + Tailwind), database (SQLite), and notifications (Email + SMS).
2. **Public user subscribes**
   - On Home, scroll to “Get Notifications” and enter email (and optionally phone).
3. **Admin records a disaster**
   - Log in to admin dashboard.
   - Create a new disaster with type, location, severity (e.g. 8 for HIGH), and description.
4. **Show alerts on UI**
   - Go to Alerts page and show the new alert card.
5. **Show notification output**
   - Check your email inbox (and console logs) to show that an email was sent.
   - If Twilio is configured, show the SMS arriving on the phone.
6. **Explain expiry**
   - Optionally demonstrate how `valid_until` hides old alerts from the public Alerts page once they are no longer active.

This end‑to‑end flow proves that the system can record disasters, generate alerts, and notify the public via multiple channels, just like a simplified version of real disaster early warning platforms.

# Disaster-Alert-and-Prediction-System
The Disaster Alert and Prediction System is a web-based application designed to provide timely alerts and information about natural disasters. It helps users view alerts, report incidents, and access safety guidelines to improve disaster preparedness and response.


Start page :
BACKEND(DJango):
    cd BACKEND
    venv\Scripts\activate
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver

FRONTEND(React):
    cd FRONTEND
    cd frontend
    npm install
    npm start

TO COME OUT FROM THE FOLDERS:
    cd ..

