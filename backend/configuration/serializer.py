from rest_framework import serializers
from .models import CompanyInfo ,WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems,Messages,Fields,\
    PasswordManagement, GraphicalScheduleSetting, GeneralSetting,Instructions,Expanses

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

class FieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fields
        fields = "__all__"

class  PasswordManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordManagement
        fields = "__all__"
class  GraphicalScheduleSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraphicalScheduleSetting
        fields = "__all__"


class  GeneralSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralSetting
        fields = "__all__"
class  InstructionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructions
        fields = "__all__"

class  ExpansesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expanses
        fields = "__all__"