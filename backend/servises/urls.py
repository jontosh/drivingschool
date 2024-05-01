from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AddOnViewSet,ServicesViewSet,ComponentViewSet,FeeViewSet,DiscountViewSet
router = DefaultRouter()
router.register('add_on', AddOnViewSet, basename='add_on')
router.register('component', ComponentViewSet, basename='component')
router.register('fee', FeeViewSet, basename='fee')
router.register('service', ServicesViewSet, basename='service')
router.register('discount', DiscountViewSet, basename='discount')

urlpatterns = [
    path("",include(router.urls))
]
