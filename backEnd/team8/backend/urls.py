from django.urls import path
from django.urls import path, include
from django.contrib.auth.views import LogoutView
from django.contrib import admin
#from django.conf.urls import url 
#from core.views import * #not sure
from . import views
from .views import get_recipes, get_news, submit_rating, ReactView



urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('get_recipes/', views.get_recipes, name='get_recipes'),  # without parameter
    path('get_recipes/<str:ingredients>/', views.get_recipes, name='get_recipes_with_ingredients'),  # with parameter
    path('get_news/', get_news, name='get_news'),
    path('submit_rating/<int:recipe_id>/', views.submit_rating, name='submit_rating'),
    #path('', TemplateView.as_view(template_name="index.html")), might need this

   

]
