from rest_framework import serializers
from .models import Tasks,EmailTemplates,Logs,LatestNews
from location.views import LocationSerializer,VehicleSerializer
from servises.serializer import ServicesSerializer
from scheduling.serializer import AppointmentSerializer, DateRangeSerializer,WeekRangeSerializer,TimeRangeSerializer,\
    TimeSlot,Appointment
from Users.serializer import StudentSerializer,UserSerializer,BillSerializer,FilesSerializer,Enrollment
class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = "__all__"

class EmailTemplatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailTemplates
        fields = "__all__"
class LogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logs
        fields = "__all__"
class LatestNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LatestNews
        fields = "__all__"

class EnrollmentSerializer_(serializers.ModelSerializer):
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
class TimeSlotSerializer_(serializers.ModelSerializer):
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
class AppointmentSerializer_(serializers.ModelSerializer):
    student = StudentSerializer(many=True,read_only=True)
    time_slot = TimeSlotSerializer_(read_only=True)
    class Meta:
        model = Appointment
        fields = ( "student", "id","time_slot")