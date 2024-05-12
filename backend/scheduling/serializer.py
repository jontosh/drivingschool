from rest_framework import serializers
from .models import  TimeRange,TimeSlot,WeekRange,TimeOff,DateRange,Appointment
class TimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeRange
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
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "*"

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = "__all__"
