from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import CompanyInfoViewSet,WebContentViewSet,ZipCodeViewSet,StorageManagementViewSet,EmergencyDataViewSet,\
    MessageItemsViewSet,MessagesDataViewSet,FieldsDataViewSet,PasswordManagementDataViewSet,GraphicalScheduleSettingDataViewSet,\
    GeneralSettingDataViewSet,InstructionsDataViewSet,CategorizedDataAPIView,ExpansesDataViewSet
router = DefaultRouter()
router.register(f'{Router["configuration"]["children"]["company"]}', CompanyInfoViewSet, basename='company')
router.register(f'{Router["configuration"]["children"]["zipcode"]}', ZipCodeViewSet, basename='zipcode')
router.register(f'{Router["configuration"]["children"]["storage_management"]}', StorageManagementViewSet, basename='storage_management')
router.register(f'{Router["configuration"]["children"]["web_content"]}', WebContentViewSet, basename='web_content')
router.register(f'{Router["configuration"]["children"]["emergency_data"]}', EmergencyDataViewSet, basename='emergency_data')
router.register(f'{Router["configuration"]["children"]["messages_items"]}', MessageItemsViewSet, basename='messages_items')
router.register(f'{Router["configuration"]["children"]["messages"]}', MessagesDataViewSet, basename='messages')
router.register(f'{Router["configuration"]["children"]["fields"]}', FieldsDataViewSet, basename='fields')
router.register(f'{Router["configuration"]["children"]["password_management"]}', PasswordManagementDataViewSet, basename='password_management')
router.register(f'{Router["configuration"]["children"]["graph_settings"]}', GraphicalScheduleSettingDataViewSet, basename='graph_settings')
router.register(f'{Router["configuration"]["children"]["general_settings"]}', GeneralSettingDataViewSet, basename='general_settings')
router.register(f'{Router["configuration"]["children"]["instructions"]}', InstructionsDataViewSet, basename='instructions')
router.register(f'{Router["configuration"]["children"]["expanses"]}', ExpansesDataViewSet, basename='expanses')




urlpatterns = [
    path("",include(router.urls)),
]
