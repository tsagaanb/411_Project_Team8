import requests
from django.shortcuts import render
from django.http import HttpResponse
from .models import Recipe, Rating
from .forms import RatingForm
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView  #not sure what this is
from . models import *
from rest_framework.response import Response  #not sure what this is
from . serializer import *
from .utils import get_recipe_from_ingredients  # for spoonacular API

 ####api stuff 

###
def get_recipe_from_ingredients(ingredients):
    API_KEY = 'ca901afbf9cf4f24a06beb44646e7e90'
    endpoint = 'https://api.spoonacular.com/recipes/findByIngredients'

    params = {
        'ingredients': ','.join(ingredients),
        'apiKey': API_KEY,
        'number': 5  # Number of recipes to retrieve
    }

    response = requests.get(endpoint, params=params)

    if response.status_code == 200:
        recipes = response.json()
        return recipes
    else:
        return None  # Handle errors appropriately
# In your views.py
from django.shortcuts import render
from .utils import get_recipe_from_ingredients

def display_recipes(request):
    if 'ingredients' in request.GET:
        ingredients = request.GET.get('ingredients').split(',')
        recipes = get_recipe_from_ingredients(ingredients)
        if recipes:
            return render(request, 'recipes.html', {'recipes': recipes})
        else:
            return render(request, 'error.html')  # Handle error case
    return render(request, 'index.html')
###


@login_required
def rate_product(request, recipe_id):
    recipe = Recipe.objects.get(pk=recipe_id)
    if request.method == 'POST':
        form = RatingForm(request.POST)
        if form.is_valid():
            rating_value = form.cleaned_data['rating']
            comments = form.cleaned_data['comments']  # Extract comments from the form

            Rating.objects.create(user=request.user, recipe=recipe, rating=rating_value, comments=comments)
            # You might want to add logic to handle duplicates or updates here
            return redirect('product_detail', recipe_id=recipe_id)
    else:
        form = RatingForm()
    return render(request, 'rate_product.html', {'form': form, 'recipe': recipe})


#to connect to front end:

"""In  GET method we are returning data from the model by calling React.objects.all() and then using list comprehension to
convert the author and their quotes in python’s dictionary. 
In the POST method, we are simply saving the data bypassing the data to ReactSerializer(). 
It’s time to define the endpoint of the API. The end-point of an API is the URL where our client will 
hit to consume data from the server. It is generally the place where our resources (database and other programmed functions) live."""

class ReactView(APIView): 
    
    serializer_class = ReactSerializer 
  
    def get(self, request): 
        detail = [ {"name": detail.name,"detail": detail.detail}  
        for detail in React.objects.all()] 
        return Response(detail) 
  
    def post(self, request): 
  
        serializer = ReactSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 