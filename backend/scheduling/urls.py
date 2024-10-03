from config.router import Router
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(f'{Router["scheduling"]["children"]["time_slot"]}', TimeSlotViewSet, basename='time_slot')
router.register(f'{Router["scheduling"]["children"]["timeOff"]}', TimeOffViewSet, basename='timeOff')
router.register(f'{Router["scheduling"]["children"]["date_range"]}', DateRangeViewSet, basename='date_range')
router.register(f'{Router["scheduling"]["children"]["appointment"]}', AppointmentViewSet, basename='appointment')
router.register(f'{Router["scheduling"]["children"]["time_range"]}', TimeRangeViewSet, basename='time_range')
router.register(f'{Router["scheduling"]["children"]["video_lecture"]}', VideoLectureViewSet, basename='video_lecture')
router.register(f'{Router["scheduling"]["children"]["video_lecture_test"]}', VideoLectureTestViewSet, basename='video_lecture_test')
router.register(f'{Router["scheduling"]["children"]["video_lecture_student"]}', VideoLectureStudentViewSet, basename='video_lecture_student')
router.register(f'{Router["scheduling"]["children"]["video_lecture_section"]}', VideoLectureSectionViewSet, basename='video_lecture_section')
router.register(f'{Router["scheduling"]["children"]["video_lecture_section_student"]}', VideoLectureSectionStudentViewSet, basename='video_lecture_section_student')
urlpatterns = [
    path('',include(router.urls))

]


