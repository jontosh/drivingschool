from rest_framework import serializers
from .models import CompanyInfo ,WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems,Messages

class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = "__all__"  # Include all fields for now (consider selective inclusion later)
class WebContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebContent
        fields = "__all__"
class ZipCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZipCode
        fields = "__all__"
class StorageManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorageManagement
        fields = "__all__"
class EmergencyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyData
        fields = "__all__"

class MessageItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageItems
        fields = "__all__"

class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"