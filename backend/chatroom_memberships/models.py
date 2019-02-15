from django.db import models
from django.conf import settings

from backend.utils import id_generator
from backend.chatrooms.models import Chatroom


class ChatroomMembership(models.Model):
    unique_identifier = models.CharField(
        max_length=8, default=id_generator, primary_key=True)
    chatroom = models.ForeignKey(
        Chatroom, related_name="memberships", on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="chatroom_memberships", on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    nickname = models.CharField(max_length=25, default="")

    updated_at = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['chatroom', 'user']

    class Meta:
        ordering = ['updated_at']

    def __str__(self):
        return "{0} in {1}".format(self.user.username, self.chatroom.name)
