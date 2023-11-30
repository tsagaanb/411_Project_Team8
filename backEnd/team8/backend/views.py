import requests
from django.shortcuts import render
from django.http import HttpResponse

def generate_recipe(request):
    if request.method == 'POST':
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
