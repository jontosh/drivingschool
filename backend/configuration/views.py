from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import Sum
from .models import CompanyInfo ,WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems ,Messages,\
    Fields,PasswordManagement,GraphicalScheduleSetting,GeneralSetting,Instructions,Expanses
from .serializer import CompanyInfoSerializer,WebContentSerializer,EmergencyDataSerializer,ZipCodeSerializer,\
    StorageManagementSerializer,MessageItemsSerializer,MessagesSerializer,FieldsSerializer,PasswordManagementSerializer,\
    GraphicalScheduleSettingSerializer, GeneralSettingSerializer,InstructionsSerializer,ExpansesSerializer

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
class ExpansesDataViewSet(viewsets.ModelViewSet):
    queryset = Expanses.objects.all()
    serializer_class = ExpansesSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()




class CategorizedDataAPIView(APIView):
    """
    API endpoint to retrieve data categorized by name and status with summed amounts.
    """

    def get(self, request):
        # Group the model instances by 'name' and 'status' and calculate the sum of 'amount'
        grouped_data = Expanses.objects.values('name', 'status').annotate(total_amount=Sum('amount'))

        # Convert the queryset to a dictionary for easier serialization
        categorized_data = {}
        for item in grouped_data:
            name = item['name']
            status = item['status']
            total_amount = item['total_amount']
            if name not in categorized_data:
                categorized_data[name] = {}
            categorized_data[name][status] = total_amount

        return Response(categorized_data)

