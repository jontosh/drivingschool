from django.urls import path, include
from .views import your_api_view
urlpatterns = [
    path("api/",your_api_view.as_view())

]
