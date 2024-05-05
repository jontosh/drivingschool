from django.urls import path
from configuration.views import CategorizedDataAPIView
from Users.views import BillStatisticsByType
urlpatterns = [
    path("expanses/",CategorizedDataAPIView.as_view()),
    path("bill/", BillStatisticsByType.as_view()),
]