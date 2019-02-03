import graphene
from graphene_django.filter import DjangoFilterConnectionField

from .schemas.queries import ChatroomFilter, ChatroomNode
from .models import Chatroom as ChatroomModel


class Query(graphene.ObjectType):
    chatroom = graphene.Field(
        ChatroomNode, unique_identifier=graphene.String(required=True))
    chatrooms = DjangoFilterConnectionField(
        ChatroomNode, filterset_class=ChatroomFilter)

    def resolve_chatroom(self, unique_identifier):
        return ChatroomModel.objects.get(unique_identifier=unique_identifier)
