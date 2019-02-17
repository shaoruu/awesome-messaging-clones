from django.db import models
from django.contrib.auth.models import AbstractUser

from backend.utils import id_generator


class User(AbstractUser):
    unique_identifier = models.CharField(
        max_length=8, default=id_generator, unique=True)

    class Meta:
        ordering = ['username']

    def __str__(self):
        return self.username
