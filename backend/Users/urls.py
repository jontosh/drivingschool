from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import TimeRangeViewSet, InstructorViewSet, StudentViewSet, TimeSlotViewSet, WeekRangeViewSet, \
    TimeOffViewSet, DateRangeViewSet, EnrollmentViewSet, AppointmentViewSet, FileCategoryViewSet, HowDidYouHearUsViewSet, \
    UserTypeViewSet, FilesViewSet, BillViewSet,InstructorHomeAPI,StudentHomeAPI
router = DefaultRouter()
router.register(f'{Router["users"]["children"]["time_range"]}', TimeRangeViewSet, basename='time_range')
router.register(f'{Router["users"]["children"]["instructor"]}', InstructorViewSet, basename='instructor')
router.register(f'{Router["users"]["children"]["student"]}', StudentViewSet, basename='student')
router.register(f'{Router["users"]["children"]["time_slot"]}', TimeSlotViewSet, basename='time_slot')
router.register(f'{Router["users"]["children"]["week_range"]}', WeekRangeViewSet, basename='week_range')
router.register(f'{Router["users"]["children"]["timeOff"]}', TimeOffViewSet, basename='timeOff')
router.register(f'{Router["users"]["children"]["date_range"]}', DateRangeViewSet, basename='date_range')
router.register(f'{Router["users"]["children"]["enrollment"]}', EnrollmentViewSet, basename='enrollment')
router.register(f'{Router["users"]["children"]["appointment"]}', AppointmentViewSet, basename='appointment')
router.register(f'{Router["users"]["children"]["file_category"]}', FileCategoryViewSet, basename='file_category')
router.register(f'{Router["users"]["children"]["how_did_you_hear_us"]}', HowDidYouHearUsViewSet, basename='how_did_you_hear_us')
router.register(f'{Router["users"]["children"]["user_type"]}', UserTypeViewSet, basename='user_type')
router.register(f'{Router["users"]["children"]["files"]}', FilesViewSet, basename='files')
router.register(f'{Router["users"]["children"]["bill"]}', BillViewSet, basename='bill')


urlpatterns = [
    path("",include(router.urls)),
    path("ihome/<str:id>/",InstructorHomeAPI.as_view()),
    path("shome/<str:id>/",StudentHomeAPI.as_view()),

]
