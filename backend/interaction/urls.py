from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import TasksViewSet,LogsDataViewSet,LatestNewsViewSet,GetFieldNamesView,SendTemplateViewSet,TemplateViewSet
router = DefaultRouter()

router.register(f'{Router["communication"]["children"]["task"]}', TasksViewSet, basename='task')
router.register(f'{Router["communication"]["children"]["logs"]}', LogsDataViewSet, basename='logs')
router.register(f'{Router["communication"]["children"]["latest_news"]}', LatestNewsViewSet, basename='latest_news'),
router.register(f'{Router["communication"]["children"]["send_template"]}', SendTemplateViewSet, basename='send_template'),
router.register(f'{Router["communication"]["children"]["template"]}', TemplateViewSet, basename='template'),






urlpatterns = [
    path("",include(router.urls)),
    path(f'api_view', GetFieldNamesView.as_view(), name='api_view'),

]
