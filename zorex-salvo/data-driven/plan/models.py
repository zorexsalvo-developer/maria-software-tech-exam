import uuid
from django.db import models
from model_utils.models import TimeStampedModel
from model_utils import Choices
from organization.models import Organization


class Plan(TimeStampedModel):
    identifier = models.CharField(max_length=255,
                                  default=uuid.uuid4,
                                  editable=False,
                                  unique=True)
    name = models.CharField(max_length=255)
    hmo = models.ForeignKey(Organization,
                            on_delete=models.CASCADE,
                            related_name='health_plans')

    def __str__(self):
        return self.name


class Term(TimeStampedModel):
    PAYMENT_TERMS = Choices(('monthly', 'Monthly'), ('quarterly', 'Quarterly'),
                            ('annually', 'Annually'))

    plan = models.ForeignKey('Plan',
                             on_delete=models.CASCADE,
                             related_name='payment_terms')
    identifier = models.CharField(max_length=255,
                                  default=uuid.uuid4,
                                  editable=False,
                                  unique=True)
    term = models.CharField(max_length=255, choices=PAYMENT_TERMS)
    amount = models.IntegerField(help_text="in cents")

    def __str__(self):
        return self.term
