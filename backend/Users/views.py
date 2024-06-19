from rest_framework import viewsets, status,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from scheduling.models import Appointment,TimeSlot
from django.shortcuts import render
from django import forms

from django.contrib.auth import authenticate
from .models import Instructor, Student, Enrollment, FileCategory, UserType, Files, Bill,EmergencyContact,StudentNote,DrivingNote
from .serializer import InstructorSerializer, StudentSerializer,  \
       EnrollmentSerializer, FileCategorySerializer,  UserTypeSerializer, FilesSerializer, BillSerializer,\
       AuthTokenSerializer,EmergencyContactSerializer,DrivingNoteSerializer,StudentNoteSerializer
from django.contrib.auth.hashers import check_password
# Create your views here.

class EmergencyContactViewSet(viewsets.ModelViewSet):
    queryset = EmergencyContact.objects.all()
    serializer_class = EmergencyContactSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class DrivingNoteViewSet(viewsets.ModelViewSet):
    queryset = DrivingNote.objects.all()
    serializer_class = DrivingNoteSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class StudentNoteViewSet(viewsets.ModelViewSet):
    queryset = StudentNote.objects.all()
    serializer_class = StudentNoteSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class FileCategoryViewSet(viewsets.ModelViewSet):
    queryset = FileCategory.objects.all()
    serializer_class = FileCategorySerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class UserTypeViewSet(viewsets.ModelViewSet):
    queryset = UserType.objects.all()
    serializer_class = UserTypeSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()

# class CustomAuthenticationForm(forms.Form):
#     username = forms.CharField(max_length=150)
#     password = forms.CharField(widget=forms.PasswordInput)
# class CustomAuthToken(APIView):
#     permission_classes = [permissions.AllowAny]
#     def post(self, request, *args, **kwargs):
#         form = CustomAuthenticationForm(request.data)
#         print(request)
#         if form.is_valid():
#
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             user = authenticate(request, username=username, password=password)
#
#             if user:
#                 token, created = CustomToken.objects.get_or_create(user=user)
#                 return Response({'token': token.key})
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
