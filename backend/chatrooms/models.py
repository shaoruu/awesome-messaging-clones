from django.db import models
from django.conf import settings


class Chatroom(models.Model):
    name = models.CharField(primary_key=True, max_length=20)


class ChatroomMember(models.Model):
    chatroom = models.ForeignKey(
        Chatroom, related_name="memberships", on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="chatroom_memberships", on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    nickname = models.CharField(max_length=25, default="")

    REQUIRED_FIELDS = ['chatroom', 'user']

    def __str__(self):
        return "{0} in {1}".format(self.user.username, self.chatroom.name)
