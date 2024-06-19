from django.urls import path, include
from rest_framework.routers import DefaultRouter
from config.router import Router
from .views import AddOnViewSet,ServicesViewSet,ComponentViewSet,FeeViewSet,DiscountViewSet,QuestionViewSet,\
    AnswerViewSet,QuestionTypeViewSet,TestViewSet
router = DefaultRouter()
router.register(f'{Router["services"]["children"]["question"]}', QuestionViewSet, basename='question')
router.register(f'{Router["services"]["children"]["question_type"]}', QuestionTypeViewSet, basename='question_type')
router.register(f'{Router["services"]["children"]["test"]}', TestViewSet, basename='test')
router.register(f'{Router["services"]["children"]["answer"]}', AnswerViewSet, basename='answer')
router.register(f'{Router["services"]["children"]["add_on"]}', AddOnViewSet, basename='add_on')
router.register(f'{Router["services"]["children"]["component"]}', ComponentViewSet, basename='component')
router.register(f'{Router["services"]["children"]["fee"]}', FeeViewSet, basename='fee')
router.register(f'{Router["services"]["children"]["service"]}', ServicesViewSet, basename='service')
router.register(f'{Router["services"]["children"]["discount"]}', DiscountViewSet, basename='discount')

urlpatterns = [
    path("",include(router.urls))
]
