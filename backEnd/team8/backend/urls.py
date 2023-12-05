from django.urls import path
from django.urls import path, include
from django.contrib.auth.views import LogoutView
from django.contrib import admin
#from django.conf.urls import url 
#from core.views import * #not sure
from . import views
from .views import get_nutrients #second api

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('get_recipes/', views.get_recipes, name='get_recipes'),  # without parameter
    path('get_recipes/<str:ingredients>/', views.get_recipes, name='get_recipes_with_ingredients'),  # with parameter
    path('', get_nutrients, name='get_nutrients'), #for second api
]

#could also be:
'''
urlpatterns = [ 
    path('admin/', admin.site.urls), 
    path('wel/', ReactView.as_view(), name="something"), 
]
'''