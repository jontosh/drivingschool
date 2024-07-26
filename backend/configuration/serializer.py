from django import forms
from rest_framework import serializers
from .models import CompanyInfo ,WebContent,ZipCode,StorageManagement,EmergencyData,MessageItems,Messages,Fields,\
    PasswordManagement, GraphicalScheduleSetting, GeneralSetting,Instructions,Expanses
from .admin import FieldSelectionForm,Student,Instructor
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
        ref_name = "ConfigurationFields"
        fields = "__all__"

class  PasswordManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordManagement
        fields = "__all__"
class  GraphicalScheduleSettingSerializer(serializers.ModelSerializer):
    student_fields = [ (field.name, field.verbose_name) for field in Student._meta.get_fields( ) if
                       hasattr(field, 'verbose_name') ]
    instructor_fields = [ (field.name, field.verbose_name) for field in Instructor._meta.get_fields( ) if
                          hasattr(field, 'verbose_name') ]
    student_details = serializers.MultipleChoiceField(
        choices=student_fields,
    )
    instructor_details = serializers.MultipleChoiceField(
        choices=instructor_fields,
    )
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