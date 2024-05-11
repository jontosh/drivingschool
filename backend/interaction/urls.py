from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import your_api_view
from .views import QuestionViewSet,AnswerViewSet,QuestionTypeViewSet,TestViewSet,TasksViewSet,\
    EmailTemplatesViewSet,LogsDataViewSet,LatestNewsViewSet
router = DefaultRouter()
router.register(f'{Router["interaction"]["children"]["question"]}', QuestionViewSet, basename='question')
router.register(f'{Router["interaction"]["children"]["question_type"]}', QuestionTypeViewSet, basename='question_type')
router.register(f'{Router["interaction"]["children"]["test"]}', TestViewSet, basename='test')
router.register(f'{Router["interaction"]["children"]["answer"]}', AnswerViewSet, basename='answer')
router.register(f'{Router["interaction"]["children"]["task"]}', TasksViewSet, basename='task')
router.register(f'{Router["interaction"]["children"]["email_templates"]}', EmailTemplatesViewSet, basename='email_templates')
router.register(f'{Router["interaction"]["children"]["logs"]}', LogsDataViewSet, basename='logs')
router.register(f'{Router["interaction"]["children"]["latest_news"]}', LatestNewsViewSet, basename='latest_news')




urlpatterns = [
    path("api/",your_api_view.as_view()),
    path("",include(router.urls))

]
