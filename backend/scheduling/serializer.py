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
    slots = TimeRangeSerializer(many=True)


    class Meta:
        model = TimeSlot
        fields = "__all__"
    def create(self, validated_data):
        # Extract the nested TimeRange data
        time_ranges_data = validated_data.pop('slots')
        time_slot = TimeSlot.objects.create(**validated_data)

        # Create related TimeRange objects
        for time_range_data in time_ranges_data:
            time_range, created = TimeRange.objects.get_or_create(**time_range_data)
            time_slot.slots.add(time_range)  # Add the created TimeRange to TimeSlot

        return time_slot

    def update(self, instance, validated_data):
        time_ranges_data = validated_data.pop('slots', None)
        instance.week_range = validated_data.get('week_range', instance.week_range)
        instance.save( )
        if time_ranges_data is not None:
            instance.slots.clear( )
            for time_range_data in time_ranges_data:
                time_range, created = TimeRange.objects.get_or_create(**time_range_data)
                instance.slots.add(time_range)

        return instance
