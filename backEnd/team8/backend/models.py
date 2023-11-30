from django.db import models

# Create your models here.

#Model.py is one of the most import concept of django framework. It allows us to completely define the database of our web applications allowing us to : Declare tables and fields of our database. Define all meta-data of our Database.

#add stuff we want to stroe in the database :example: 
"""class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)"""



class User(models.Model):
           User_name = models.CharField(max_length = 50)
           User_email = models.CharField(max_length = 200)
           User_pass = models.CharField(max_length = 50)

#want to store recipie name, ingredients, and instructions
class Recipe(models.Model):
    recipe_name = models.CharField(max_length=200)
    instructions = models.CharField(max_length=200000)
    
class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=200)
    #ingredient_amount = models.IntegerField(default=0) #may need one of these for each ingredient
    ingredient_amount = models.ForeignKey(Recipe, on_delete=models.CASCADE)

class UserRecipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self): #string representation of the object, dont know if we need this
        return self.recipe_name
    
