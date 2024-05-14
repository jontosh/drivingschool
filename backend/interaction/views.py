from rest_framework import status
from rest_framework.views import APIView
from django.apps import apps
from rest_framework.response import Response
from markdown import markdown
from rest_framework import viewsets
from .models import Tasks,EmailTemplates ,Logs, LatestNews
from configuration.models import Expanses
from Users.serializer import BillSerializer,Bill,Enrollment,Files,FilesSerializer
from scheduling.models import Appointment,TimeSlot
from django.db.models import Sum,Count
from collections import defaultdict
from .serializer import TasksSerializer\
    ,EmailTemplatesSerializer,LogsSerializer,LatestNewsSerializer,EnrollmentSerializer_,TimeSlotSerializer_,AppointmentSerializer_

class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()

class EmailTemplatesViewSet(viewsets.ModelViewSet):
    queryset = EmailTemplates.objects.all()
    serializer_class = EmailTemplatesSerializer
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

def get_model_field_info():
    not_include = ["Tasks","EmailTemplates","Fields","Rights","Question","Answer","QuestionType"]
    all_fields = []
    for app in apps.get_app_configs():
        for model in app.get_models():
            if not model._meta.abstract:
                model_data = {f'app': app.label, f'model': model.__name__,'fields': []}  # Use app label for consistency
                for field in model._meta.get_fields():
                    # if not model.__name__ in [a.lower() for a in not_include]:
                    #     get ,create = Fields.objects.get_or_create(app_name=app.label,model_name=model.__name__,field_name=field.name)
                    #     if create:
                    #         get.save()
                    #     else:
                    #         get.delete()
                    model_data['fields'].append(field.name)
                all_fields.append(model_data)  # Append model data to the list

    return all_fields
class your_api_view(APIView):
    def get(self, request):
        model_field_info = get_model_field_info()
        return Response(model_field_info)


def get_field_value(input_string):
    # Split the input string to extract model name and field name
    parts = input_string.split('.')
    if len(parts) != 3:
        print("1\n\n\n")
        return None  # Invalid input format
    model_name, field_name, field = parts
    print("1\n\n\n")


    try:
        # Get the model class using apps.get_model()
        model = apps.get_model(model_name,field_name)
        print(model)
        if model:
            # Query the database to retrieve the field value
            queryset = model.objects.first()
            queryset = getattr(queryset, field, None)
            if queryset:
                return queryset # Return the first value
            else:
                return None  # No data found for the given model and field
    except LookupError:
        return None  # Model not found


def parse_markdown(markdown_text):
    models = apps.get_models()
    for model in models:
        app_label = model._meta.app_label
        model_name = model.__name__.lower()
        for field in model._meta.fields:
            placeholder = f'{app_label}.{model_name}.{field.name}'
            print(placeholder, "\t",)
            if placeholder in markdown_text:
                value = get_field_value(placeholder)
                markdown_text = markdown_text.replace(placeholder, str(value))

    print("Request Data:", markdown_text)

    return markdown(markdown_text)


class SendEmailAPIView(APIView):
    def post(self, request, *args, **kwargs):

        for key, value in  request.data.items():
            markdown_text = key
        print("Request Data:", markdown_text)
        parsed_text = parse_markdown(markdown_text)
        return Response({'status': f'{parsed_text}'}, status=status.HTTP_200_OK)
#STATISTIC API
class CategorizedDataAPIView(APIView):
    """
    API endpoint to retrieve data categorized by name and status with summed amounts.
    """

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
        ready_data = {}
        appointments  = Appointment.objects.filter(time_slot__staff_id=id)
        serializer = AppointmentSerializer_(appointments,many=True)
        for i in serializer.data:
            i["time_slot"] = TimeSlotSerializer_(TimeSlot.objects.get(id=i["time_slot"])).data

        return Response(serializer.data)

class StudentHomeAPI(APIView):
    def get(self,request,id):
        enrolment = Enrollment.objects.filter(student__id=id)
        enrolment = EnrollmentSerializer_(enrolment,many=True)
        bill = Bill.objects.filter(student__id=id)
        bill = BillSerializer(bill,many=True)
        files = Files.objects.filter(student__id=id)
        files = FilesSerializer(files,many=True)
        appointments  = Appointment.objects.filter(student__id=id)
        appointments = AppointmentSerializer_(appointments,many=True)
        for i in enrolment.data:
            i["bill"] = bill.data
            i["files"]= files.data
            i["appointments"] = appointments.data

        return Response(enrolment.data)