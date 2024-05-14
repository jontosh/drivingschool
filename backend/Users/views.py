from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from scheduling.models import Appointment,TimeSlot
from django.shortcuts import render
from .models import  Instructor,Student,Enrollment,FileCategory,UserType,Files,Bill
from .serializer import InstructorSerializer, StudentSerializer,  \
       EnrollmentSerializer, FileCategorySerializer,  UserTypeSerializer, FilesSerializer, BillSerializer

# Create your views here.

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


