from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from django.apps import apps
from rest_framework.response import Response
from markdown import markdown
from configuration.models import Fields
def get_model_field_info():
    not_include = ["EmergencyData","MessageItems","Fields","Rights","Question","Answer","QuestionType"]
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
