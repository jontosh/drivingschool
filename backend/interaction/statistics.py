from django.urls import path
from .views import CategorizedDataAPIView
from .views import BillStatisticsByType
from config.router import Router
urlpatterns = [
    path(f'{Router["statistics"]["children"]["expanses"]}',CategorizedDataAPIView.as_view()),
    path(f'{Router["statistics"]["children"]["bill"]}', BillStatisticsByType.as_view()),
]