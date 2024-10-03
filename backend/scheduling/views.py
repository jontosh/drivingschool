from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializer import *


# Create your views here.
class TimeRangeViewSet(viewsets.ModelViewSet):
    queryset = TimeRange.objects.all( )
    serializer_class = TimeRangeSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all( )
    serializer_class = TimeSlotSerializer

    def perform_create(self, serializer):
        # Handle week_range field as a list
        week_range = self.request.data.get('week_range', [ ])
        serializer.save(week_range=week_range)

    def perform_update(self, serializer):
        # Handle week_range field as a list
        week_range = self.request.data.get('week_range', [ ])
        serializer.save(week_range=week_range)


class TimeOffViewSet(viewsets.ModelViewSet):
    queryset = TimeOff.objects.all( )
    serializer_class = TimeOffSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class DateRangeViewSet(viewsets.ModelViewSet):
    queryset = DateRange.objects.all( )
    serializer_class = DateRangeSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all( )
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class VideoLectureViewSet(viewsets.ModelViewSet):
    queryset = VideoLecture.objects.all( )
    serializer_class = VideoLectureSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class VideoLectureTestViewSet(viewsets.ModelViewSet):
    queryset = VideoLectureTest.objects.all( )
    serializer_class = VideoLectureTestSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class VideoLectureStudentViewSet(viewsets.ModelViewSet):
    queryset = VideoLectureStudent.objects.all( )
    serializer_class = VideoLectureStudentSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class VideoLectureSectionViewSet(viewsets.ModelViewSet):
    queryset = VideoLectureSection.objects.all( )
    serializer_class = VideoLectureSectionSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )


class VideoLectureSectionStudentViewSet(viewsets.ModelViewSet):
    queryset = VideoLectureSectionStudent.objects.all( )
    serializer_class = VideoLectureSectionStudentSerializer

    def perform_create(self, serializer):
        serializer.save( )

    def perform_update(self, serializer):
        serializer.save( )
