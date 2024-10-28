from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from django.views.generic.base import TemplateView
from django.apps import apps
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Tasks ,Logs, LatestNews
from configuration.models import Expanses
from Users.serializer import BillSerializer,Bill,Enrollment,Files,FilesSerializer,Student,Instructor
from location.views import Class,ClassSerializer
from scheduling.views import Appointment,TimeSlot,TimeOff,TimeOffSerializer
from django.db.models import Sum,Count
from collections import defaultdict
from .serializer import TasksSerializer\
    ,LogsSerializer,LatestNewsSerializer,EnrollmentSerializer_,TimeSlotSerializer_,AppointmentSerializer_,\
    StudentSerializerEmail,AppointmentEmailSerializer,InstructorEmailSerializer,EmailTemplateSerializer,EmailTemplate,\
    TemplateSerializer,SendTemplateSerializer,StudentTestFullSerializer,Template,SendTemplate,StudentTest,WebMessages,\
    WebMessagesSerializer
from django.core.mail import send_mail
import stripe, json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import  re
class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()


class LogsDataViewSet(viewsets.ModelViewSet):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class LatestNewsViewSet(viewsets.ModelViewSet):
    queryset = LatestNews.objects.all()
    serializer_class = LatestNewsSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class GetFieldNamesView(APIView):
    """
    This API provides all app  model and field name like this "appname modelname fieldname"
    """
    def get(self, request, format=None):
        not_include = ["admin","auth","contenttypes","mainadmin","sessions","PasswordManagement","GraphicalScheduleSetting","GeneralSetting", "Tasks", "EmailTemplates", "Fields", "Rights", "Question", "Answer", "QuestionType","HowDidYouHearUs" ]
        field_names = []
        for app_config in apps.get_app_configs():
            for model in app_config.get_models():
                for field in model._meta.fields:
                    if  model.__name__ not in not_include and app_config.label not in not_include:
                        field_name = f"{app_config.label} {model.__name__} {field.name}"
                        field_names.append(field_name)
        return Response(field_names)


#PAYMENT HANDLER
@csrf_exempt
def charge(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            # Create a charge
            charge = stripe.Charge.create(
                amount=5000,  # $50.00 this is in cents
                currency="usd",
                source=data['stripeToken'],  # obtained from Stripe.js
                description="Payment for Product",
            )
            return JsonResponse({'status': 'Payment successful'})
        except stripe.error.StripeError as e:
            return JsonResponse({'status': 'Payment failed', 'error': str(e)})

class HomePageView(TemplateView):
    template_name = 'stripe.html'
#STATISTIC API
class CategorizedDataAPIView(APIView):
    """
    API endpoint to retrieve data categorized by name and status with summed amounts.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Group the model instances by 'name' and 'status' and calculate the sum of 'amount'
        grouped_data = Expanses.objects.values('name', 'status').annotate(total_amount=Sum('amount'))

        # Convert the queryset to a dictionary for easier serialization
        categorized_data = {}
        for item in grouped_data:
            name = item['name']
            status = item['status']
            total_amount = item['total_amount']
            if name not in categorized_data:
                categorized_data[name] = {}
            categorized_data[name][status] = total_amount

        return Response(categorized_data)

class BillStatisticsByType(APIView):
    def get(self,request):
        data = Bill.objects.values("package", "type").annotate(
            total_amount=Sum("price"), count=Count("package")
        )
        ready_data = defaultdict(lambda: {"Count": 0})
        for bill in data:
            package = bill["package"]
            type = bill["type"]
            price = bill["total_amount"]
            count = bill["count"]
            ready_data[package][type] = price
            ready_data[package]["Count"] += count
        ready_data = dict(ready_data)

        return Response(ready_data)




#PAGE API
class InstructorHomeAPI(APIView):
    def get(self,request,id):
        data = { "all_time_slots": [ ] }
        for i in TimeSlot.objects.filter(staff__id = id):
            data["all_time_slots"].append(TimeSlotSerializer_(i).data)
        appointments  = Appointment.objects.filter(time_slot__staff_id=id)
        serializer = AppointmentSerializer_(appointments,many=True)
        for i in serializer.data:
            i["time_slot"] = TimeSlotSerializer_(TimeSlot.objects.get(id=i["time_slot"]["id"])).data
        data["appointment"] = serializer.data
        logs = Logs.objects.filter(user__id=id)
        logs = LogsSerializer(logs, many=True)
        data[ "logs" ] = logs.data
        return Response(data)

class StudentHomeAPI(APIView):
    def get(self,request,id):
        data = {}
        student_tests = StudentTest.objects.filter(student__id=id)
        student_tests = StudentTestFullSerializer(student_tests,many=True)
        data[ "student_test" ] = student_tests.data
        enrolment = Enrollment.objects.filter(student__id=id)
        enrolment = EnrollmentSerializer_(enrolment,many=True)
        data[ "enrolments" ] = enrolment.data
        bill = Bill.objects.filter(student__id=id)
        bill = BillSerializer(bill,many=True)
        data["bills"]=bill.data
        files = Files.objects.filter(student__id=id)
        files = FilesSerializer(files,many=True)
        data["files"]=files.data
        appointments  = Appointment.objects.filter(student__id=id)
        appointments = AppointmentSerializer_(appointments,many=True)
        data["appointments"]=appointments.data
        logs = Logs.objects.filter(user__id=id)
        logs = LogsSerializer(logs, many=True)
        data[ "logs" ] = logs.data
        return Response(data)

class StudentEmailTemplateView(APIView):
    """
    This API provides all data Students have
    """
    def get(self, request, UUID):
        student = Student.objects.get(pk=UUID)
        student = StudentSerializerEmail(student,many=False)
        appointments = Appointment.objects.filter(student__id=UUID)
        appointments = AppointmentEmailSerializer(appointments,many=True)
        student.appointments = appointments
        return Response(student.data)
class StudentEmailListView(APIView):
    """
    This API provides all keys Students have
    """
    def get(self,request):
        key_list = generate_key_list(StudentSerializerEmail(Student.objects.first()).data,name="student")
        return Response(key_list)

class InstructorEmailTemplateView(APIView):
    """
    This API provides all data Instructors have
    """
    def get(self, request, UUID):
        """
            classes = ClassFullSerializer(many=True,read_only=True)
            time_slot = TimeSlotSerializer_(read_only=True,many=True)
            time_off = TimeOffSerializer(read_only=True,many=True)
        """
        instructor = Instructor.objects.get(pk=UUID)
        instructor = InstructorEmailSerializer(instructor)
        classes = Class.objects.filter(teacher__id=UUID)
        classes = ClassSerializer(classes,many=True)
        instructor.classes = classes
        time_slot = TimeSlot.objects.filter(staff__id=UUID)
        time_slot = TimeSlotSerializer_(time_slot,many=True)
        time_slot.time_slot = time_slot
        time_off = TimeOff.objects.filter(staff__id=UUID)
        time_off = TimeOffSerializer(time_off, many=True)
        time_off.time_slot = time_off


        return Response(instructor.data)
class InstructorEmailListView(APIView):
    """
    This API provides all keys Instructors have
    """
    def get(self,request):
        key_list = generate_key_list(InstructorEmailSerializer(Instructor.objects.first()).data,name="instructor")
        return Response(key_list)

def extract_keys(data, parent_key=''):
    """
    Extract keys from a nested dictionary and generate paths in the format 'data.key1.key2'.
    """
    items = []
    for k, v in data.items():
        new_key = f"{parent_key}.{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(extract_keys(v, new_key))
        else:
            items.append(new_key)
    return items

def generate_key_list(data,name:str):
    """
    Generate the list in the format data=[data.high_school.id, data.staff.location.name]
    """
    keys = extract_keys(data)
    key_list = [f"{name}.{key}" for key in keys]
    return key_list


class EmailTemplateStudentView(viewsets.ModelViewSet):
    """
    Here we will receive email with variable and change them by accessing serializers data.
    It will save email then gets text out of it simultaneously gets matching data from serializer.
    Then pass data and text to replace_placeholders it will return edited email text
    """
    queryset = EmailTemplate.objects.all( )
    serializer_class = EmailTemplateSerializer
    def perform_create(self, serializer):
        if serializer.is_valid():
            email = serializer.save()
            text = email.email
            if email.student:
                student = email.student
                data = StudentSerializerEmail(student).data
                email.email = self.replace_placeholders(text, data)
                email.save()
            elif email.Instructor:
                Instructor = email.instructor
                data = InstructorEmailSerializer(Instructor).data
                email.email = self.replace_placeholders(text, data)
                email.save()
    def perform_update(self, serializer):
        serializer.save()
    def get_nested_value(self,data, key_path):
        """
        Here this will return value of variable provided by user in email template
        """
        keys = key_path.split('.')
        value = data
        print(keys)
        for key in keys[1:]:
            value = value.get(key)
            if value is None:
                return ''
        return value
    def replace_placeholders(self,text, data):
        """
        Here we will find is there any variable in text email template .
        """
        pattern = r'{{(.*?)}}'
        def replacer(match):
            key = match.group(1).strip()
            return str(self.get_nested_value(data, key))

        return re.sub(pattern, replacer, text)



class SendTemplateViewSet(viewsets.ModelViewSet):
    queryset = SendTemplate.objects.all()
    serializer_class = SendTemplateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # # Perform any custom logic before saving the school, e.g., validation checks
        # serializer.save()
        if serializer.is_valid():
            send_template = serializer.save()
            main_template = send_template.template
            template = main_template.template
            subject = main_template.name
            users = send_template.to.all()
            for user in users:
                if str(user.type.name).lower() == "student":
                    data = StudentSerializerEmail(Student.objects.get(id=user.id)).data
                    email = self.replace_placeholders(template, data)
                    send_mail(subject,email,'aliyuldashev880@gmail.com',[user.email])
                else:
                    data = InstructorEmailSerializer(Instructor.objects.get(id=user.id)).data
                    email = self.replace_placeholders(template, data)
                    send_mail(subject,email,'aliyuldashev880@gmail.com',[user.email])


    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
    def get_nested_value(self,data, key_path):
        """
        Here this will return value of variable provided by user in email template
        """
        keys = key_path.split('.')
        value = data
        print(keys)
        for key in keys[1:]:
            value = value.get(key)
            if value is None:
                return ''
        return value
    def replace_placeholders(self,text, data):
        """
        Here we will find is there any variable in text email template .
        """
        pattern = r'{{(.*?)}}'
        def replacer(match):
            key = match.group(1).strip()
            return str(self.get_nested_value(data, key))

        return re.sub(pattern, replacer, text)


class TemplateViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class WebMessagesViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = WebMessages.objects.all()
    serializer_class = WebMessagesSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()