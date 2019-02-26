from django.db import models
from django.conf import settings

from backend.utils import id_generator


class Chatroom(models.Model):
    unique_identifier = models.CharField(
        max_length=8, default=id_generator, primary_key=True)
    name = models.CharField(max_length=20, default="")
    updated_at = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['name']

    class Meta:
        ordering = ['updated_at']

    def __str__(self):
        return self.name
