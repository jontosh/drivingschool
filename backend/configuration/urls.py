from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyInfoViewSet,WebContentViewSet,ZipCodeViewSet,StorageManagementViewSet,EmergencyDataViewSet,MessageItemsViewSet,MessagesDataViewSet
router = DefaultRouter()
router.register('company', CompanyInfoViewSet, basename='company')
router.register('zipcode', ZipCodeViewSet, basename='zipcode')
router.register('storage_management', StorageManagementViewSet, basename='storage_management')
router.register('web_content', WebContentViewSet, basename='web_content')
router.register('emergency_data', EmergencyDataViewSet, basename='emergency_data')
router.register('messages_items', MessageItemsViewSet, basename='messages_items')
router.register('messages', MessagesDataViewSet, basename='messages')



urlpatterns = [
    path("",include(router.urls))
]
