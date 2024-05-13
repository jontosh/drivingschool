from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import SchoolViewSet,VehicleViewSet,ClassViewSet,LocationViewSet,LocationSmallViewSet,HowDidYouHearUsViewSet
router = DefaultRouter()
router.register(f'{Router["account_management"]["children"]["schools"]}', SchoolViewSet, basename='schools')
router.register(f'{Router["account_management"]["children"]["class"]}', ClassViewSet, basename='class')
router.register(f'{Router["account_management"]["children"]["location"]}', LocationViewSet, basename='location')
router.register(f'{Router["account_management"]["children"]["vehicle"]}', VehicleViewSet, basename='vehicle')
router.register(f'{Router["account_management"]["children"]["location_small"]}', LocationSmallViewSet, basename='location_small')
router.register(f'{Router["account_management"]["children"]["how_did_you_hear_us"]}', HowDidYouHearUsViewSet, basename='how_did_you_hear_us')

urlpatterns = [
    path("",include(router.urls))
]
