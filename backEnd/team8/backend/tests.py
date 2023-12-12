from django.test import TestCase
from django.contrib.auth.models import User
from .models import Recipe, UserRecipe

class RecipeTestCase(TestCase):
    def setUp(self):
        # Create a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Create a recipe for testing
        self.recipe = Recipe.objects.create(
            recipe_name='Test Recipe',
            instructions='Test instructions',
            # Add other required fields for your Recipe model
        )

    def test_get_recipes(self):
        # Log in the user
        self.client.login(username='testuser', password='testpassword')

        # Make sure the user exists in the test database
        self.assertTrue(User.objects.filter(username='testuser').exists())

        # Make a GET request to get recipes
        response = self.client.get('/backend/get_recipes/', {'ingredients': 'ingredient1,ingredient2'})

        # Check if the response indicates success
        self.assertEqual(response.status_code, 200)

        # Check if the response contains recipe data
        recipes = response.json()
        self.assertTrue(isinstance(recipes, list))
        self.assertTrue(len(recipes) > 0)

        # Adjust the assertions based on your response structure
        self.assertEqual(recipes[0]['recipe_name'], 'Test Recipe')
        self.assertIn('instructions', recipes[0])  # Assuming instructions are part of the response
        # Add more assertions as needed
