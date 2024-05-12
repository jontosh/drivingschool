from collections import defaultdict
from rest_framework import viewsets
from django.db.models import Sum, Count
from rest_framework.views import APIView
from rest_framework.response import Response
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

class InstructorHomeAPI(APIView):
    def get(self,request,id):
        ready_data = {}
        appointments  = Appointment.objects.filter(time_slot__staff_id=id)
        serializer = AppointmentSerializer(appointments,many=True)
        for i in serializer.data:
            i["time_slot"] = TimeSlotSerializer(TimeSlot.objects.get(id=i["time_slot"])).data

        return Response(serializer.data)

class StudentHomeAPI(APIView):
    def get(self,request,id):
        enrolment = Enrollment.objects.filter(student__id=id)
        print(enrolment)
        enrolment = EnrollmentSerializer(enrolment,many=True)
        bill = Bill.objects.filter(student__id=id)
        bill = BillSerializer(bill,many=True)
        files = Files.objects.filter(student__id=id)
        files = FilesSerializer(files,many=True)
        appointments  = Appointment.objects.filter(student__id=id)
        appointments = AppointmentSerializer(appointments,many=True)
        for i in enrolment.data:
            i["bill"] = bill.data
            i["files"]= files.data
            i["appointments"] = appointments.data

        return Response(enrolment.data)



def landing_page(request):
    return render(request, 'index.html')