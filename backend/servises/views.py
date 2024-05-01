from django.shortcuts import render

from rest_framework import viewsets
from .models import AddOn ,Services,Component,Fee,Discount
from .serializer import AddOnSerializer,ServicesSerializer,DiscountSerializer,ComponentSerializer,FeeSerializer

class AddOnViewSet(viewsets.ModelViewSet):
    queryset = AddOn.objects.all()
    serializer_class = AddOnSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class FeeViewSet(viewsets.ModelViewSet):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    def perform_create(self, serializer):
        # Perform any custom logic before saving the school, e.g., validation checks
        serializer.save()
    def perform_update(self, serializer):
        # Perform any custom logic before updating the school, e.g., authorization checks
        serializer.save()
