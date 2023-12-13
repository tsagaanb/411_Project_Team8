import requests
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from .models import Recipe, UserRecipe
from .forms import RatingForm
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView  #not sure what this is
from . models import *
from rest_framework.response import Response  #not sure what this is
from . serializer import *
#from .utils import get_recipe_from_ingredients  # for spoonacular API
from django.http import JsonResponse
from .models import User


 ####api stuff 

###
def get_recipes(request):
    if request.method == 'GET':
        # Get user input ingredients from the request
        user_input = request.GET.get('ingredients', '')  # Assuming 'ingredients' is the parameter name

        # Set up your Spoonacular API endpoint and parameters
        api_key = 'ca901afbf9cf4f24a06beb44646e7e90'
        endpoint = 'https://api.spoonacular.com/recipes/findByIngredients'
        params = {
            'ingredients': user_input,
            'apiKey': api_key,
            'number': 10, # number of recipes returned to user
            # 3 for now, for tests only. Update to 10 when making a video
        }

        # Make a GET request to the Spoonacular API
        response = requests.get(endpoint, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            # Parse the JSON response
            recipes = response.json()
            # Process the recipes data as needed
            # For example, you can extract recipe names, IDs, etc.
            
            # Return the recipe data as JSON response
            return JsonResponse(recipes, safe=False)
        else:
            # Handle API request failure
            return JsonResponse({'error': 'Failed to fetch recipes'}, status=response.status_code)

    # Handle other HTTP methods if needed
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_news(request): #second api
    if request.method == 'GET':
     # Get user input ingredients from the request
     user_input = request.GET.get('keywords', '') 

    news_api_key = '2be62868051e4302984528e0d8dbf8c9'
    news_api_url = 'https://newsapi.org/v2/everything'

    params = {
            'q': user_input,
            'apiKey': news_api_key,
        }

    response = requests.get(news_api_url, params=params)


    if response.status_code == 200:
            # Parse the JSON response
            news_data = response.json()
            # Process the news data as needed
            # For example, you can extract article titles, URLs, etc.
            
            # Return the news data as JSON response
            return JsonResponse(news_data, safe=False)
    else:
        # Handle API request failure
        return JsonResponse({'error': 'Failed to fetch news articles'}, status=response.status_code)

    # Handle other HTTP methods if needed
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def submit_rating(request, recipe_id):
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    
    if request.method == 'POST':
        rating_value = request.POST.get('rating')  # Get rating value from POST data
        comments = request.POST.get('comments')  # Get comments from POST data

        # Save rating in the database
        rating = Rating.objects.create(user=request.user, recipe=recipe, rating=rating_value, comments=comments)

        # Update recipe's average rating and total ratings count
        ratings = Rating.objects.filter(recipe=recipe)
        total_ratings = ratings.count()
        average_rating = ratings.aggregate(avg_rating=models.Avg('rating'))['avg_rating']

        recipe.total_ratings = total_ratings
        recipe.average_rating = average_rating
        recipe.save()

        return JsonResponse({'message': 'Rating submitted successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_saved_recipes(request):
    if request.method == 'GET':
        # Retrieve all saved recipes (or apply your filtering logic here)
        saved_recipes = Recipe.objects.all().values('recipe_name', 'instructions', 'average_rating', 'total_ratings')

        # Convert queryset to a list to be included in the JSON response
        saved_recipes_list = list(saved_recipes)

        # Return the saved recipes data as JSON response
        return JsonResponse(saved_recipes_list, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def save_recipe(request, recipe_id):
    if request.method == 'POST':
        # Extract recipe data from request
        recipe_data = request.POST

        # Create a new Recipe instance
        recipe = Recipe.objects.create(**recipe_data)

        # Save the recipe
        recipe.save()

        return JsonResponse({'message': 'Recipe saved successfully'}, status=201)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def save_user_name(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        user = User.objects.create(name=name)
        return JsonResponse({'status': 'success', 'userId': user.id})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
    
    

#to connect to front end:

"""In  GET method we are returning data from the model by calling React.objects.all() and then using list comprehension to
convert the author and their quotes in python’s dictionary. 
In the POST method, we are simply saving the data bypassing the data to ReactSerializer(). 
It’s time to define the endpoint of the API. The end-point of an API is the URL where our client will 
hit to consume data from the server. It is generally the place where our resources (database and other programmed functions) live."""

class ReactView(APIView):
    
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [{"name": detail.name, "detail": detail.detail} for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def save_recipe(self, recipe_data):
        # You can implement the logic to save recipe information here
        # Example: Save the recipe data to a Recipe model
        recipe_serializer = RecipeSerializer(data=recipe_data)
        if recipe_serializer.is_valid(raise_exception=True):
            recipe_serializer.save()

    def handle_recipe_data(self, recipe_data):
        # Perform any additional processing or validation on the recipe data
        # This can include calling the save_recipe method
        self.save_recipe(recipe_data)
        # Additional logic if needed

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            
            # Assuming recipe data is part of the request or can be obtained
            recipe_data = request.data.get('recipe_data', None)
            if recipe_data:
                self.handle_recipe_data(recipe_data)

            return Response(serializer.data)
