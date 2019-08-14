from django.urls import path
from .views import ListPlanAPIView, CreateCartAPIView, RetrieveCartAPIView, AddToCartAPIView, RemoveItemFromCartAPIView, PayCartAPIView

urlpatterns = [
    path('plans/', ListPlanAPIView.as_view(), name='list_plan'),
    path('carts/', CreateCartAPIView.as_view(), name='create_cart'),
    path('carts/<identifier>/add/',
         AddToCartAPIView.as_view(),
         name='add_to_cart'),
    path('carts/<cart_identifier>/items/<item_identifier>/',
         RemoveItemFromCartAPIView.as_view(),
         name='remove_from_cart'),
    path('carts/<identifier>/',
         RetrieveCartAPIView.as_view(),
         name='retrieve_cart'),
    path('carts/<identifier>/pay/', PayCartAPIView.as_view(), name='pay_cart'),
]
