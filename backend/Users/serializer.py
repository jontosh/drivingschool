from rest_framework import serializers
from .models import  TimeRange,Instructor,Student,TimeSlot,WeekRange,TimeOff,DateRange,Enrollment,\
    Appointment,FileCategory,HowDidYouHearUs,UserType,Files,Bill
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
class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
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
class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = "__all__"
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
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
