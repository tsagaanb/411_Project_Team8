from django.urls import path
from django.urls import path, include
from django.contrib.auth.views import LogoutView
from django.contrib import admin
from django.conf.urls import url 
from core.views import * #not sure
from . import views

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('logout/', LogoutView.as_view(), name='logout'),
]

#could also be:
'''
urlpatterns = [ 
    path('admin/', admin.site.urls), 
    path('wel/', ReactView.as_view(), name="something"), 
]
'''