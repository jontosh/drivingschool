from django.shortcuts import render

from rest_framework import viewsets
from .models import CompanyInfo ,WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems ,Messages,\
    Fields,PasswordManagement,GraphicalScheduleSetting,GeneralSetting,Instructions
from .serializer import CompanyInfoSerializer,WebContentSerializer,EmergencyDataSerializer,ZipCodeSerializer,\
    StorageManagementSerializer,MessageItemsSerializer,MessagesSerializer,FieldsSerializer,PasswordManagementSerializer,\
    GraphicalScheduleSettingSerializer, GeneralSettingSerializer,InstructionsSerializer

class CompanyInfoViewSet(viewsets.ModelViewSet):
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class WebContentViewSet(viewsets.ModelViewSet):
    queryset = WebContent.objects.all()
    serializer_class = WebContentSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class ZipCodeViewSet(viewsets.ModelViewSet):
    queryset = ZipCode.objects.all()
    serializer_class = ZipCodeSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class StorageManagementViewSet(viewsets.ModelViewSet):
    queryset = StorageManagement.objects.all()
    serializer_class = StorageManagementSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class EmergencyDataViewSet(viewsets.ModelViewSet):
    queryset = EmergencyData.objects.all()
    serializer_class = EmergencyDataSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class MessageItemsViewSet(viewsets.ModelViewSet):
    queryset = MessageItems.objects.all()
    serializer_class = MessageItemsSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class MessagesDataViewSet(viewsets.ModelViewSet):
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class FieldsDataViewSet(viewsets.ModelViewSet):
    queryset = Fields.objects.all()
    serializer_class = FieldsSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class PasswordManagementDataViewSet(viewsets.ModelViewSet):
    queryset = PasswordManagement.objects.all()
    serializer_class = PasswordManagementSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class GraphicalScheduleSettingDataViewSet(viewsets.ModelViewSet):
    queryset = GraphicalScheduleSetting.objects.all()
    serializer_class = GraphicalScheduleSettingSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()


class GeneralSettingDataViewSet(viewsets.ModelViewSet):
    queryset = GeneralSetting.objects.all()
    serializer_class = GeneralSettingSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class InstructionsDataViewSet(viewsets.ModelViewSet):
    queryset = Instructions.objects.all()
    serializer_class = InstructionsSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()