from rest_framework import serializers
from .models import AddOn ,Services,Component,Fee,Discount,Question ,Answer,QuestionType,Test,StudentQuestion,StudentTest
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
class AddOnSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddOn
        fields = "__all__"  # Include all fields for now (consider selective inclusion later)
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = "__all__"
class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = "__all__"
class FeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fee
        fields = "__all__"
class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = "__all__"

class StudentQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentQuestion
        fields = "__all__"

class StudentTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTest
        fields = "__all__"