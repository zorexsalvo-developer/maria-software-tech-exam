from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from plan.models import Plan
from cart.models import Cart
from .serializers import ListPlanSerializer, CreateCartSerializer


class ListPlanAPIView(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = ListPlanSerializer


class CreateCartAPIView(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CreateCartSerializer


class RetrieveCartAPIView(RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CreateCartSerializer
    lookup_field = 'identifier'
