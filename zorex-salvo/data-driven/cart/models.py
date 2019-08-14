import uuid
from django.db import models
from model_utils import Choices
from model_utils.models import TimeStampedModel
from model_utils.fields import StatusField
from plan.models import Plan, Term


class Cart(TimeStampedModel):
    STATUS = Choices('pending', 'paid')

    identifier = models.CharField(max_length=255,
                                  default=uuid.uuid4,
                                  editable=False,
                                  unique=True)
    status = StatusField()
    total_amount = models.IntegerField(help_text='in cents', default=0)

    def __str__(self):
        return f'{self.identifier}'


class Item(TimeStampedModel):
    identifier = models.CharField(max_length=255,
                                  default=uuid.uuid4,
                                  editable=False,
                                  unique=True)
    cart = models.ForeignKey(Cart,
                             on_delete=models.CASCADE,
                             related_name='cart_items')
    plan = models.ForeignKey(Plan,
                             on_delete=models.CASCADE,
                             related_name='plan_particurals')
    payment_term = models.CharField(max_length=255, choices=Term.PAYMENT_TERMS)
    quantity = models.IntegerField()

    def __str__(self):
        return self.identifier
