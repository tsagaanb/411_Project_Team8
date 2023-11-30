from django.shortcuts import render
import requests

# Create your views here.
from django.http import HttpResponse


def index(request):
    #return HttpResponse("Hello, world. You're at the polls index.")
#encapsulates the logic that defines how your application interacts with users' requests.
#this is the file where you would write calls to the api
    foods = "apples, user input"

    url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={foods}&number=10&limitLicense=true&ranking=1&ignorePantry=false"

   # should have user input 
    response = requests.get(url)
    #acessing the spenacular api and getting the response

    if response.status_code == 200:
        data = response.json()
        return render(request, 'my_template.html', {'api_data': data})
    else:
        error_message = f"Error: {response.status_code}"
        return render(request, 'error_template.html', {'error_message': error_message})

