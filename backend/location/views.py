from django.shortcuts import render

from rest_framework import viewsets
from .models import School ,Vehicle,LocationSmall,Class,Location
from .serializer import SchoolSerializer,VehicleSerializer,LocationSerializer,LocationSmallSerializer,ClassSerializer

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class LocationSmallViewSet(viewsets.ModelViewSet):
    queryset = LocationSmall.objects.all()
    serializer_class = LocationSmallSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
