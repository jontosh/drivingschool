# In urls.py
from django.urls import path
from .views import DocumentationView
from config.router import Router
# from Users.authentications import custom_login
# from rest_framework.authtoken.views import obtain_auth_token
# from django.contrib.auth import views as auth_views
from .serializer import CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('', DocumentationView.as_view(),name="documentation"),
    path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "token_obtain_pair" ]}', CustomTokenObtainPairView.as_view( ), name='token_obtain_pair'),
    path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "token_refresh" ]}', TokenRefreshView.as_view( ), name='token_refresh'),
    path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "token_verify" ]}', TokenVerifyView.as_view( ), name='token_verify'),
    # path(, obtain_auth_token,name='obtain_auth_token'),
    # path(,custom_login, name='login'),
    # path(, auth_views.LogoutView.as_view(),name='logout'),
]
