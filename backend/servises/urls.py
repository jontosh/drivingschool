from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import AddOnViewSet,ServicesViewSet,ComponentViewSet,FeeViewSet,DiscountViewSet
router = DefaultRouter()
router.register(f'{Router["services"]["children"]["add_on"]}', AddOnViewSet, basename='add_on')
router.register(f'{Router["services"]["children"]["component"]}', ComponentViewSet, basename='component')
router.register(f'{Router["services"]["children"]["fee"]}', FeeViewSet, basename='fee')
router.register(f'{Router["services"]["children"]["service"]}', ServicesViewSet, basename='service')
router.register(f'{Router["services"]["children"]["discount"]}', DiscountViewSet, basename='discount')

urlpatterns = [
    path("",include(router.urls))
]
