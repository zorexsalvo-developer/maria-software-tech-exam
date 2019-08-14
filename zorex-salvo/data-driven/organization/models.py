import uuid
from django.db import models
from model_utils.models import TimeStampedModel


class Organization(TimeStampedModel):
    identifier = models.CharField(max_length=255,
                                  default=uuid.uuid4,
                                  editable=False,
                                  unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
