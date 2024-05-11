from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import SchoolViewSet,VehicleViewSet,ClassViewSet,LocationViewSet,LocationSmallViewSet
router = DefaultRouter()
router.register(f'{Router["location"]["children"]["schools"]}', SchoolViewSet, basename='schools')
router.register(f'{Router["location"]["children"]["class"]}', ClassViewSet, basename='class')
router.register(f'{Router["location"]["children"]["location"]}', LocationViewSet, basename='location')
router.register(f'{Router["location"]["children"]["vehicle"]}', VehicleViewSet, basename='vehicle')
router.register(f'{Router["location"]["children"]["location_small"]}', LocationSmallViewSet, basename='location_small')

urlpatterns = [
    path("",include(router.urls))
]
