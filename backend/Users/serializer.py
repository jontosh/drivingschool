from rest_framework import serializers
from .models import  Instructor,Student,Enrollment,FileCategory,UserType,Files,Bill, User
from location.views import LocationSerializer,VehicleSerializer
from servises.serializer import ServicesSerializer
from scheduling.serializer import AppointmentSerializer
class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = "__all__"
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
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
    package = ServicesSerializer(many=True)
    student = StudentSerializer()
    by = UserSerializer()
    cr = LocationSerializer()
    appointments = AppointmentSerializer(many=True,read_only=True)
    bill = BillSerializer(many=True,read_only=True)
    files = FilesSerializer(many=True,read_only=True)
    class Meta:
        model = Enrollment
        fields = ["student","data","code","by","price","cr","cr_start","cr_end","package","appointments","bill","files",]
