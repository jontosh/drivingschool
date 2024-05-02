from rest_framework import status
from rest_framework.views import APIView
from django.apps import apps
from rest_framework.response import Response
from markdown import markdown
from rest_framework import viewsets
from .models import Question ,Answer,QuestionType,Test,Tasks,EmailTemplates ,Logs, LatestNews
from .serializer import QuestionSerializer,AnswerSerializer,TasksSerializer,QuestionTypeSerializer,\
    TestSerializer,EmailTemplatesSerializer,LogsSerializer,LatestNewsSerializer
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class QuestionTypeViewSet(viewsets.ModelViewSet):
    queryset = QuestionType.objects.all()
    serializer_class = QuestionTypeSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
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
