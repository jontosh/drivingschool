from django.urls import path
from config.router import Router
from .views import InstructorHomeAPI,StudentHomeAPI


urlpatterns = [
    path(f"{Router['page_api']['children']['instructor']}<str:id>/", InstructorHomeAPI.as_view()),
    path(f"{Router['page_api']['children']['student']}<str:id>/", StudentHomeAPI.as_view( )),
]