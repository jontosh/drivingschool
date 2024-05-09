from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyInfoViewSet,WebContentViewSet,ZipCodeViewSet,StorageManagementViewSet,EmergencyDataViewSet,\
    MessageItemsViewSet,MessagesDataViewSet,FieldsDataViewSet,PasswordManagementDataViewSet,GraphicalScheduleSettingDataViewSet,\
    GeneralSettingDataViewSet,InstructionsDataViewSet,CategorizedDataAPIView,ExpansesDataViewSet
router = DefaultRouter()
router.register('company', CompanyInfoViewSet, basename='company')
router.register('zipcode', ZipCodeViewSet, basename='zipcode')
router.register('storage_management', StorageManagementViewSet, basename='storage_management')
router.register('web_content', WebContentViewSet, basename='web_content')
router.register('emergency_data', EmergencyDataViewSet, basename='emergency_data')
router.register('messages_items', MessageItemsViewSet, basename='messages_items')
router.register('messages', MessagesDataViewSet, basename='messages')
router.register('fields', FieldsDataViewSet, basename='fields')
router.register('password_management', PasswordManagementDataViewSet, basename='password_management')
router.register('graph_settings', GraphicalScheduleSettingDataViewSet, basename='graph_settings')
router.register('general_settings', GeneralSettingDataViewSet, basename='general_settings')
router.register('instructions', InstructionsDataViewSet, basename='instructions')
router.register('expanses', ExpansesDataViewSet, basename='expanses')
# router.register('expanses_statistics', CategorizedDataAPIView, basename='expanses_statistics')




urlpatterns = [
    path("",include(router.urls)),
]
