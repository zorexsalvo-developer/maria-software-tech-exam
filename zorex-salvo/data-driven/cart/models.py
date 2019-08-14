import uuid
from django.db import models
from model_utils import Choices
from model_utils.models import TimeStampedModel
from model_utils.fields import StatusField
from plan.models import Plan, Term


class Cart(TimeStampedModel):
    STATUS = Choices('pending', 'paid')

    identifier = models.UUIDField(default=uuid.uuid4, editable=False)
    status = StatusField()


class Item(TimeStampedModel):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False)
    plan = models.ForeignKey(Plan,
                             on_delete=models.CASCADE,
                             related_name='plan_particurals')
    payment_term = models.CharField(max_length=255, choices=Term.PAYMENT_TERMS)
    quantity = models.IntegerField()
