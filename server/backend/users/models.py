from django.db import models
from random import *
from django.contrib.auth.models import AbstractUser

from backend.utils import id_generator


class User(AbstractUser):
    unique_identifier = models.CharField(
        max_length=8, default=id_generator, unique=True)

    # Profile image
    image = models.ImageField(
        default='initial_profiles/{}.jpg'.format(randint(0, 517)), upload_to='profile_pics')

    class Meta:
        ordering = ['username']

    def __str__(self):
        return self.username
