# In urls.py
from django.urls import path
from .views import vie,LoginView
from config.router import Router
from Users.authentications import custom_login
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('', vie,name="documentation"),
    path('login/', LoginView.as_view(),name="login_"),
    path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "obtain_auth_token" ]}', obtain_auth_token,name='obtain_auth_token'),
    path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "login" ]}',custom_login, name='login'),
    path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "logout" ]}', auth_views.LogoutView.as_view(),name='logout'),
]
