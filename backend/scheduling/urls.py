from config.router import Router
from rest_framework.routers import DefaultRouter
from .views import *
router = DefaultRouter()

router.register(f'{Router["scheduling"]["children"]["time_slot"]}', TimeSlotViewSet, basename='time_slot')
router.register(f'{Router["scheduling"]["children"]["week_range"]}', WeekRangeViewSet, basename='week_range')
router.register(f'{Router["scheduling"]["children"]["timeOff"]}', TimeOffViewSet, basename='timeOff')
router.register(f'{Router["scheduling"]["children"]["date_range"]}', DateRangeViewSet, basename='date_range')
router.register(f'{Router["scheduling"]["children"]["appointment"]}', AppointmentViewSet, basename='appointment')
router.register(f'{Router["scheduling"]["children"]["time_range"]}', TimeRangeViewSet, basename='time_range')