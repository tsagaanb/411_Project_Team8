from django.contrib import admin
from .models import User, UserRecipe, Recipe, Ingredient # Importing models 

# Register your models here
admin.site.register(User)
admin.site.register(UserRecipe)
admin.site.register(Recipe)
admin.site.register(Ingredient)

