from rest_framework import serializers
from .models import Tasks,Logs,LatestNews,EmailTemplate,Template,SendTemplate
from location.views import LocationSerializer,VehicleSerializer,SchoolSerializer,Vehicle,Class,Location
from servises.serializer import ServicesSerializer,TestSerializer,StudentQuestionSerializer,StudentTest
from scheduling.serializer import AppointmentSerializer, DateRangeSerializer,TimeRangeSerializer,\
    TimeSlot,Appointment, TimeOffSerializer
from Users.serializer import StudentSerializer,BillSerializer,FilesSerializer,Enrollment,Student,Instructor


class LocationFullSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Location
class VehicleFullSerializer(serializers.ModelSerializer):
    location = LocationFullSerializer(read_only=True)
    class Meta:
        fields = '__all__'
        model = Vehicle
class InstructorFullSerializer(serializers.ModelSerializer):
    location = LocationFullSerializer(read_only=True)
    vehicle = VehicleFullSerializer(read_only = True)
    working_hours = TimeRangeSerializer(read_only=True,many=True)

    class Meta:
        fields ='__all__'
        model = Instructor
class TimeSlotSerializer_(serializers.ModelSerializer):
    date_range = DateRangeSerializer(read_only=True)
    location = LocationFullSerializer(read_only=True)
    vehicle = VehicleSerializer(read_only=True)
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


#COMMUNICATION SERIALIZERS
class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = "__all__"
class LogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logs
        fields = "__all__"
class LatestNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LatestNews
        fields = "__all__"

#TEST FULL SERIALIZER
class StudentTestFullSerializer(serializers.ModelSerializer):
    test = TestSerializer(read_only=True)
    student_answers = StudentQuestionSerializer(read_only=True,many=True)
    class Meta:
        fields= "__all__"
        model = StudentTest

class ClassFullSerializer(serializers.ModelSerializer):
    location = LocationFullSerializer(read_only=True)
    day = TimeRangeSerializer(read_only=True,many=True)
    teacher= InstructorFullSerializer(read_only=True)
    class Meta:
        fields= "__all__"
        model = Class
class EnrollmentSerializer_(serializers.ModelSerializer):
    package = ServicesSerializer(many=True)
    student = StudentSerializer()
    cr = ClassFullSerializer()
    class Meta:
        model = Enrollment
        fields = ["student","data","code","by","price","cr","cr_start","cr_end","package"]
class AppointmentSerializer_(serializers.ModelSerializer):
    student = StudentSerializer(many=True,read_only=True)
    time_slot = TimeSlotSerializer_(read_only=True)
    class Meta:
        model = Appointment
        fields = ( "student", "id","time_slot")



#EMAIL TEMPLATE
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
            "home_phone",
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
class InstructorEmailSerializer(serializers.ModelSerializer):
    """
    This will show all data of Instructor even if reversely connected ones like time_off
    """
    location = LocationFullSerializer(read_only=True)
    vehicle = VehicleFullSerializer(read_only = True)
    working_hours = TimeRangeSerializer(read_only=True,many=True)
    classes = ClassFullSerializer(many=True,read_only=True)
    time_slot = TimeSlotSerializer_(read_only=True,many=True)
    time_off = TimeOffSerializer(read_only=True,many=True)
    class Meta:
        fields =["id","status","first_name","mid_name","last_name","address","city","state","zip","email","code",
                 "home_phone","cell_phone","birth","username","password","type","staff_type","location","vehicle",
                 "emergency_name","emergency_relation","emergency_phone","licenses","car_permit_data","car_permit_expire",
                 "color","zoom","picture","working_hours","classes","time_slot","time_off",
        ]
        model = Instructor

class EmailTemplateSerializer(serializers.ModelSerializer):
    """
    This is email Template serializer. It will help to get text and Student or Instructor. while saving data it
    will change text by itself
    """
    class Meta:
        model = EmailTemplate
        fields = "__all__"


class TemplateSerializer(serializers.ModelSerializer):
    """
    This is email Template serializer. It will help to get text and Student or Instructor. while saving data it
    will change text by itself
    """
    class Meta:
        model = Template
        fields = "__all__"


class SendTemplateSerializer(serializers.ModelSerializer):
    """
    This is email Template serializer. It will help to get text and Student or Instructor. while saving data it
    will change text by itself
    """
    class Meta:
        model = SendTemplate
        fields = "__all__"