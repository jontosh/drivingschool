from rest_framework import serializers
from .models import  TimeRange,Instructor,Student,TimeSlot,WeekRange,TimeOff,DateRange,Enrollment,\
    Appointment,FileCategory,HowDidYouHearUs,UserType,Files,Bill, User
from location.views import LocationSerializer,VehicleSerializer
from servises.serializer import ServicesSerializer
class TimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeRange
        fields = "__all__"
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



class WeekRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeekRange
        fields = "__all__"
class TimeOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeOff
        fields = "__all__"
class DateRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateRange
        fields = "__all__"

class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FileCategory
        fields = "__all__"
class HowDidYouHearUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HowDidYouHearUs
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
class TimeSlotSerializer(serializers.ModelSerializer):
    date_range = DateRangeSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    vehicle = VehicleSerializer(read_only=True)
    week_range = WeekRangeSerializer(many=True,read_only=True)
    slots = TimeRangeSerializer(many=True,read_only=True)
    class Meta:
        model = TimeSlot
        fields = "__all__"

    def get_authors(self, obj):
        return obj.authors.all()
class AppointmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=True,read_only=True)
    time_slot = TimeSlotSerializer(read_only=True)
    class Meta:
        model = Appointment
        fields = ( "student", "id","time_slot")

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
