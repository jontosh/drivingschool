"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .router import Router
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [

    path('admin/', admin.site.urls),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path(f'{Router["services"]["base"]}', include("servises.urls"),name=Router["services"]["base"]),
    path(f'{Router["account_management"]["base"]}', include("location.urls"),name=Router["account_management"]["base"]),
    path(f'{Router["configuration"]["base"]}', include("configuration.urls"),name=Router["configuration"]["base"]),
    path(f'{Router["communication"]["base"]}', include("interaction.urls"),name=Router["communication"]["base"]),
    path(f'{Router["student_account"]["base"]}', include("Users.urls"),name=Router["student_account"]["base"]),
    path(f'{Router[ "abstracts" ][ "base" ]}', include("abstracts.urls"),name=Router["abstracts"]["base"]),
    path(f'{Router[ "scheduling" ][ "base" ]}', include("scheduling.urls"),name=Router["scheduling"]["base"]),
    #MADE FOR STATISTICS
    path(f'{Router["statistics"]["base"]}', include("interaction.statistics"),name=Router["statistics"]["base"]),

    #MADE FOR PAGE API
    path(f'{Router["page_api"]["base"]}', include("interaction.page_api"),name=Router["page_api"]["base"]),

]+  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)