from django.urls import path
from config.router import Router
from .views import InstructorHomeAPI,StudentHomeAPI,StudentEmailTemplateView,InstructorEmailTemplateView,\
    StudentEmailListView,InstructorEmailListView


urlpatterns = [
    path(f"{Router['page_api']['children']['instructor']}<str:id>/", InstructorHomeAPI.as_view()),
    path(f"{Router['page_api']['children']['student']}<str:id>/", StudentHomeAPI.as_view( )),
    path(f"{Router['page_api']['children']['student_email_templates']}", StudentEmailTemplateView.as_view( )),
    path(f"{Router[ 'page_api' ][ 'children' ][ 'instructor_email_templates' ]}", InstructorEmailTemplateView.as_view( )),
    path(f"{Router[ 'page_api' ][ 'children' ][ 'student_list_email_templates' ]}", StudentEmailListView.as_view( )),
    path(f"{Router[ 'page_api' ][ 'children' ][ 'instructor_list_email_templates' ]}", InstructorEmailListView.as_view( )),

]