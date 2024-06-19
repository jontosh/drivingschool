from rest_framework import serializers ,fields
from .models import  TimeRange,TimeSlot,TimeOff,DateRange,Appointment
class TimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeRange
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
        fields = "__all__"

class TimeSlotSerializer(serializers.ModelSerializer):
    WEEK_CHOICES = [
        [ 'Monday', 'Monday' ],
        [ 'Tuesday', 'Tuesday' ],
        [ 'Wednesday', 'Wednesday' ],
        [ 'Thursday', 'Thursday' ],
        [ 'Friday', 'Friday' ],
        [ 'Saturday', 'Saturday' ],
        [ 'Sunday', 'Sunday' ],
    ]
    week_range = fields.MultipleChoiceField(choices=WEEK_CHOICES)
    class Meta:
        model = TimeSlot
        fields = "__all__"
