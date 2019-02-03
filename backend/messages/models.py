from django.db import models
from django.utils import timezone
from django.conf import settings
from backend.chatrooms.models import Chatroom


class Message(models.Model):
    message = models.CharField(max_length=1000)

    ' Relations with other models '
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="sent_messages", on_delete=models.CASCADE)
    chatroom = models.ForeignKey(
        Chatroom, related_name="messages", on_delete=models.CASCADE)

    ' Timestamps '
    sent_at = models.DateTimeField(default=timezone.now)
    edited_at = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['message', 'sender', 'chatroom']

    class Meta:
        ordering = ['sent_at']

    def __str__(self):
        return "{0}: {1}".format(self.sender.name, self.message)
