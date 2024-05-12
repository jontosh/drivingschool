from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import  InstructorViewSet, StudentViewSet,EnrollmentViewSet,  FileCategoryViewSet, UserTypeViewSet, FilesViewSet, BillViewSet,InstructorHomeAPI,StudentHomeAPI
router = DefaultRouter()

router.register(f'{Router["student_account"]["children"]["instructor"]}', InstructorViewSet, basename='instructor')
router.register(f'{Router["student_account"]["children"]["student"]}', StudentViewSet, basename='student')
router.register(f'{Router["student_account"]["children"]["enrollment"]}', EnrollmentViewSet, basename='enrollment')
router.register(f'{Router["student_account"]["children"]["file_category"]}', FileCategoryViewSet, basename='file_category')
router.register(f'{Router["student_account"]["children"]["user_type"]}', UserTypeViewSet, basename='user_type')
router.register(f'{Router["student_account"]["children"]["files"]}', FilesViewSet, basename='files')
router.register(f'{Router["student_account"]["children"]["bill"]}', BillViewSet, basename='bill')


urlpatterns = [
    path("",include(router.urls)),
    path("ihome/<str:id>/",InstructorHomeAPI.as_view()),
    path("shome/<str:id>/",StudentHomeAPI.as_view()),

]
