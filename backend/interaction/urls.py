from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import your_api_view
from .views import TasksViewSet, EmailTemplatesViewSet,LogsDataViewSet,LatestNewsViewSet
router = DefaultRouter()

router.register(f'{Router["communication"]["children"]["task"]}', TasksViewSet, basename='task')
router.register(f'{Router["communication"]["children"]["email_templates"]}', EmailTemplatesViewSet, basename='email_templates')
router.register(f'{Router["communication"]["children"]["logs"]}', LogsDataViewSet, basename='logs')
router.register(f'{Router["communication"]["children"]["latest_news"]}', LatestNewsViewSet, basename='latest_news')




urlpatterns = [
    path("api/",your_api_view.as_view()),
    path("",include(router.urls))

]
