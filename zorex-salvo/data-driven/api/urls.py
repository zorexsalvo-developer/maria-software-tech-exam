from django.urls import path
from .views import ListPlanAPIView, CreateCartAPIView, RetrieveCartAPIView

urlpatterns = [
    path('plans/', ListPlanAPIView.as_view(), name='list_plan'),
    path('carts/', CreateCartAPIView.as_view(), name='create_cart'),
    path('carts/<identifier>/',
         RetrieveCartAPIView.as_view(),
         name='retrieve_cart')
]
