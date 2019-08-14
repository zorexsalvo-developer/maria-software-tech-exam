from rest_framework.generics import ListAPIView
from plan.models import Plan
from .serializers import ListPlanSerializer


class ListPlanAPIView(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = ListPlanSerializer
