import uuid
from django.db import models
from model_utils.models import TimeStampedModel
from organization.models import Organization


class Plan(TimeStampedModel):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    hmo = models.ForeignKey(Organization,
                            on_delete=models.CASCADE,
                            related_name='health_plans')
