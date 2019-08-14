import uuid
from django.db import models
from model_utils.models import TimeStampedModel


class Organization(TimeStampedModel):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
