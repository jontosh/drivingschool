from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import your_api_view
from .views import QuestionViewSet,AnswerViewSet,QuestionTypeViewSet,TestViewSet,TasksViewSet,\
    EmailTemplatesViewSet,LogsDataViewSet,LatestNewsViewSet
router = DefaultRouter()
router.register('question', QuestionViewSet, basename='question')
router.register('question_type', QuestionTypeViewSet, basename='question_type')
router.register('test', TestViewSet, basename='test')
router.register('answer', AnswerViewSet, basename='answer')
router.register('task', TasksViewSet, basename='task')
router.register('email_templates', EmailTemplatesViewSet, basename='email_templates')
router.register('logs', LogsDataViewSet, basename='logs')
router.register('latest_news', LatestNewsViewSet, basename='latest_news')




urlpatterns = [
    path("api/",your_api_view.as_view()),
    path("",include(router.urls))

]
