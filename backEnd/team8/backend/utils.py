from .models import UserRecipe, Recipe, Ingredient
import requests

#file that acceses api

def save_api_data_to_model(api_data):
    for item in api_data:
        Recipe.objects.create(
            field1=item['field1'],
            field2=item['field2'],
            # Add more fields as needed
        )
        
