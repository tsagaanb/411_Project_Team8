from django.db import models

# frontent stuff
class React(models.Model):
    name = models.CharField(max_length=100)
    detail = models.TextField()
    

class User(models.Model):
           User_name = models.CharField(max_length = 50)
           User_email = models.CharField(max_length = 200)
           User_pass = models.CharField(max_length = 50)

# want to store recipie name, ingredients, and instructions,
# and an optional rating for each of the recipes that the API returns
class Recipe(models.Model):
    recipe_name = models.CharField(max_length=200)
    instructions = models.CharField(max_length=200000)
    # New fields for ratings
    average_rating = models.FloatField(default=0) #average rating of the recipe
    total_ratings = models.IntegerField(default=0)   #total number of ratings
    comments = models.TextField(blank=True, null=True)

# the ingredients that the user inputs into the search bar
class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=200)
    #ingredient_amount = models.IntegerField(default=0) #may need one of these for each ingredient
    ingredient_amount = models.ForeignKey(Recipe, on_delete=models.CASCADE)


class UserRecipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self): #string representation of the object, dont know if we need this
        return self.recipe.recipe_name
    
"""
# Adding a rating system on the recipes
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comments = models.TextField(blank=True, null=True)
"""