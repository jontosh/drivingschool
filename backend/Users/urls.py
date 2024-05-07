from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TimeRangeViewSet, InstructorViewSet, StudentViewSet, TimeSlotViewSet, WeekRangeViewSet, \
    TimeOffViewSet, DateRangeViewSet, EnrollmentViewSet, AppointmentViewSet, FileCategoryViewSet, HowDidYouHearUsViewSet, \
    UserTypeViewSet, FilesViewSet, BillViewSet,InstructorHomeAPI,StudentHomeAPI
router = DefaultRouter()
router.register('time_range', TimeRangeViewSet, basename='time_range')
router.register('instructor', InstructorViewSet, basename='instructor')
router.register('student', StudentViewSet, basename='student')
router.register('time_slot', TimeSlotViewSet, basename='time_slot')
router.register('week_range', WeekRangeViewSet, basename='week_range')
router.register('timeOff', TimeOffViewSet, basename='timeOff')
router.register('date_range', DateRangeViewSet, basename='date_range')
router.register('enrollment', EnrollmentViewSet, basename='enrollment')
router.register('appointment', AppointmentViewSet, basename='appointment')
router.register('file_category', FileCategoryViewSet, basename='file_category')
router.register('how_did_you_hear_us', HowDidYouHearUsViewSet, basename='how_did_you_hear_us')
router.register('user_type', UserTypeViewSet, basename='user_type')
router.register('files', FilesViewSet, basename='files')
router.register('bill', BillViewSet, basename='bill')


urlpatterns = [
    path("",include(router.urls)),
    path("ihome/<str:id>/",InstructorHomeAPI.as_view()),
    path("shome/<str:id>/",StudentHomeAPI.as_view()),

]
