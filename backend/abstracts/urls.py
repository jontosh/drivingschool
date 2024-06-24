# In urls.py
from django.urls import path
from .views import DocumentationView
from config.router import Router
from Users.authentications import custom_login
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('', DocumentationView.as_view(),name="documentation"),
    path('api/token/', TokenObtainPairView.as_view( ), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view( ), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view( ), name='token_verify'),
    # path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "obtain_auth_token" ]}', obtain_auth_token,name='obtain_auth_token'),
    # path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "login" ]}',custom_login, name='login'),
    # path(f'{Router[ "authentication" ]["base"]}{Router[ "authentication" ][ "children" ][ "logout" ]}', auth_views.LogoutView.as_view(),name='logout'),
]
