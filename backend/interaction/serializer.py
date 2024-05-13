from rest_framework import serializers
from .models import Tasks,EmailTemplates,Logs,LatestNews


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