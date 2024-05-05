from django.shortcuts import render
from collections import defaultdict
from rest_framework import viewsets
from django.db.models import Sum, Count
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import  TimeRange,Instructor,Student,TimeSlot,WeekRange,TimeOff,DateRange,Enrollment,\
    Appointment,FileCategory,HowDidYouHearUs,UserType,Files,Bill
from .serializer import TimeRangeSerializer ,InstructorSerializer, StudentSerializer, TimeSlotSerializer, \
    WeekRangeSerializer, TimeOffSerializer, DateRangeSerializer, EnrollmentSerializer, AppointmentSerializer, \
    FileCategorySerializer, HowDidYouHearUsSerializer, UserTypeSerializer, FilesSerializer, BillSerializer
# Create your views here.
class TimeRangeViewSet(viewsets.ModelViewSet):
    queryset = TimeRange.objects.all()
    serializer_class = TimeRangeSerializer
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
class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class WeekRangeViewSet(viewsets.ModelViewSet):
    queryset = WeekRange.objects.all()
    serializer_class = WeekRangeSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class TimeOffViewSet(viewsets.ModelViewSet):
    queryset = TimeOff.objects.all()
    serializer_class = TimeOffSerializer
    def perform_create(self, serializer):
        serializer.save()
    def perform_update(self, serializer):
        serializer.save()
class DateRangeViewSet(viewsets.ModelViewSet):
    queryset = DateRange.objects.all()
    serializer_class = DateRangeSerializer
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
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
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
class HowDidYouHearUsViewSet(viewsets.ModelViewSet):
    queryset = HowDidYouHearUs.objects.all()
    serializer_class = HowDidYouHearUsSerializer
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

