from rest_framework import serializers
from .models import  Instructor,Student,Enrollment,FileCategory,Files,Bill,EmergencyContact,StudentNote,DrivingNote
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.urls import reverse
from mainadmin.models import CustomUser
from django.contrib.auth.password_validation import validate_password
from mainadmin.models import UserType, Rights, Fields

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = "__all__"
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = "__all__"
class StudentNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentNote
        fields = "__all__"

class DrivingNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivingNote
        fields = "__all__"

class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FileCategory
        fields = "__all__"

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = "__all__"

class RightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rights
        fields = "__all__"
class FieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fields
        fields = "__all__"
class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = "__all__"
class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = "__all__"

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = "__all__"


class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = CustomUser.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value

    def save(self):
        request = self.context.get('request')
        user = CustomUser.objects.get(email=self.validated_data['email'])
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        self.send_email(user, uid, token)

    def send_email(self, user, uid, token):
        reset_link = f"{self.context[ 'request' ].scheme}://{self.context[ 'request' ].get_host( )}{reverse('password_reset_confirm', kwargs={ 'uidb64': uid, 'token': token })}"
        subject = "Password Reset Requested"
        message = f"Hi {user.username},\n\nYou have requested a password reset. Please click the link below to reset your password:\n{reset_link}\n\nIf you did not request this, please ignore this email.\n\nThank you!"
        send_mail(
            subject,
            message,
            'aliyuldashev880@gmail.com',
            [ 'yuldashevjavohir15@gmail.com' ],
            fail_silently=False,
        )

class PasswordResetConfirmSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("New passwords do not match.")
        return data