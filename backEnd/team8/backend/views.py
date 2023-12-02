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
 ####api stuff 


def generate_recipe(request):
    if request.method == 'GET':
        # Assuming you have a form with a field named 'ingredients'
        ingredients = request.POST.get('ingredients')

        # Replace 'API_ENDPOINT' with the actual recipe API endpoint
        recipe_api_url = f'https://api.spoonacular.com/recipes/findByIngredients?ingredients={ingredients}&number=10&limitLicense=true&ranking=1&ignorePantry=false'

        try:
            # Make a GET request to the recipe API
            response = requests.get(recipe_api_url)

            if response.status_code == 200:
                # If the API call is successful, retrieve the recipe data
                recipe_data = response.json()
                # Process the recipe data as needed
                # For example, extract recipe details and render them in a template
                return render(request, 'recipe_template.html', {'recipe': recipe_data})
            else:
                return HttpResponse(f"Failed to fetch recipe. Error: {response.status_code}")
        
        except requests.RequestException as e:
            return HttpResponse(f"Error fetching recipe: {str(e)}")

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