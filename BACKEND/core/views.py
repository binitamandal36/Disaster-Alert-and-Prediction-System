from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Disaster Alert and Prediction System")
