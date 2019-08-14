from django.urls import path
from .views import ListPlanAPIView

urlpatterns = [path('plans/', ListPlanAPIView.as_view(), name='list_plan')]
