from django.contrib import admin
from .models import UserRecipe, Recipe, Ingredient # Importing models 

# Register your models here
admin.site.register(User)
admin.site.register(UserRecipe)
admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Rating)

