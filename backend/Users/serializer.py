from rest_framework import serializers
from .models import  Instructor,Student,Enrollment,FileCategory,UserType,Files,Bill,EmergencyContact,StudentNote,DrivingNote

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = "__all__"
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = "__all__"
class StudentNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentNote
        fields = "__all__"

class DrivingNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivingNote
        fields = "__all__"

class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FileCategory
        fields = "__all__"

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = "__all__"
class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = "__all__"
class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = "__all__"

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = "__all__"


class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()