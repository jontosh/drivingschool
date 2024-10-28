from django.urls import path
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import InstructorHomeAPI,StudentHomeAPI,StudentEmailTemplateView,InstructorEmailTemplateView,\
    StudentEmailListView,InstructorEmailListView,EmailTemplateStudentView,charge,HomePageView
router = DefaultRouter()
router.register(f"{Router['page_api' ]['children' ]['email_template' ]}", EmailTemplateStudentView,basename=f"{Router['page_api' ]['children' ]['email_template' ]}")
urlpatterns = [
    path(f"{Router['page_api']['children']['instructor']}", InstructorHomeAPI.as_view()),
    path(f"{Router['page_api']['children']['student']}", StudentHomeAPI.as_view( )),
    path(f"{Router['page_api']['children']['student_email_templates']}", StudentEmailTemplateView.as_view( )),
    path(f"{Router['page_api' ]['children' ]['instructor_email_templates' ]}", InstructorEmailTemplateView.as_view( )),
    path(f"{Router['page_api' ]['children' ]['student_list_email_templates' ]}", StudentEmailListView.as_view( )),
    path(f"{Router['page_api' ]['children' ]['instructor_list_email_templates' ]}", InstructorEmailListView.as_view( )),
    path(f"{Router['page_api' ]['children' ]['charge' ]}", HomePageView.as_view(), name='charge'),
]+router.urls