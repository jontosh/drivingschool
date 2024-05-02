from rest_framework import serializers
from .models import Question ,Answer,QuestionType,Test,Tasks,EmailTemplates,Logs,LatestNews

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"  # Include all fields for now (consider selective inclusion later)
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"
class QuestionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionType
        fields = "__all__"
class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"
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