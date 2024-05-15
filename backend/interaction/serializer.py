from rest_framework import serializers
from .models import Tasks,EmailTemplates,Logs,LatestNews
from location.views import LocationSerializer,VehicleSerializer,LocationSmallSerializer,SchoolSerializer
from servises.serializer import ServicesSerializer
from scheduling.serializer import AppointmentSerializer, DateRangeSerializer,WeekRangeSerializer,TimeRangeSerializer,\
    TimeSlot,Appointment
from Users.serializer import StudentSerializer,UserSerializer,BillSerializer,FilesSerializer,Enrollment,Student


class LocationFullSerializer(serializers.ModelSerializer):
    pick_up = LocationSmallSerializer(read_only=True)
    drop_off = LocationSmallSerializer(read_only=True)
class InstructorFullSerializer(serializers.ModelSerializer):
    location = LocationFullSerializer(read_only=True)
    vehicle = VehicleSerializer(read_only = True)


class TimeSlotSerializer_(serializers.ModelSerializer):
    date_range = DateRangeSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    vehicle = VehicleSerializer(read_only=True)
    week_range = WeekRangeSerializer(many=True,read_only=True)
    slots = TimeRangeSerializer(many=True,read_only=True)
    staff = InstructorFullSerializer(read_only=True)
    class Meta:
        model = TimeSlot
        fields = "__all__"

    def get_authors(self, obj):
        return obj.authors.all()



class AppointmentEmailSerializer(serializers.ModelSerializer):
    time_slot = TimeSlotSerializer_(read_only=True)
    class Meta:
        model = Appointment
        fields = (  "id","time_slot")




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
class AppointmentSerializer_(serializers.ModelSerializer):
    student = StudentSerializer(many=True,read_only=True)
    time_slot = TimeSlotSerializer_(read_only=True)
    class Meta:
        model = Appointment
        fields = ( "student", "id","time_slot")


class StudentSerializerEmail(serializers.ModelSerializer):
    """
        Here we will use this API to catch up email templates variable
    """
    staff = InstructorFullSerializer(read_only=True)
    location = LocationFullSerializer(read_only=True)
    high_school = SchoolSerializer(read_only=True)
    appointments = AppointmentEmailSerializer(read_only=True,many=True)
    class Meta:
        # read_only = True,
        model = Student
        fields = [
            "id",
            "status",
            "first_name",
            "mid_name",
            "last_name",
            "address",
            "city",
            "state",
            "zip",
            "email",
            "code",
            "home_photo",
            "cell_phone",
            "birth",
            "username",
            "password",
            "type",
            "home_pickup",
            "gender",
            "preferred_pronoun",
            "dl_permit",
            "dl_given_date",
            "dl_expire_date",
            "note",
            "medical_condition",
            "parent_name",
            "parent_email",
            "parent_phone",
            "parent_2_name",
            "parent_2_email",
            "parent_2_phone",
            "appointments",
            "high_school",
            "staff",
            "location",

        ]
        extra_kwargs = { field: { 'read_only': True } for field in fields }