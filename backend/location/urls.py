from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet,VehicleViewSet,ClassViewSet,LocationViewSet,LocationSmallViewSet
router = DefaultRouter()
router.register('schools', SchoolViewSet, basename='schools')
router.register('class', ClassViewSet, basename='class')
router.register('location', LocationViewSet, basename='location')
router.register('vehicle', VehicleViewSet, basename='vehicle')
router.register('location_small', LocationSmallViewSet, basename='location_small')

urlpatterns = [
    path("",include(router.urls))
]
