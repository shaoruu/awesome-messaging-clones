import graphene
from graphene_django.filter import DjangoFilterConnectionField
from backend.chatrooms.schemas.queries import ChatroomFilter, ChatroomNode
from backend.chatrooms.models import Chatroom as ChatroomModel


class Query(graphene.ObjectType):
    chatroom = graphene.Field(
        ChatroomNode, name=graphene.String(required=True))
    chatrooms = DjangoFilterConnectionField(
        ChatroomNode, filterset_class=ChatroomFilter)

    def resolve_chatroom(self, name):
        return ChatroomModel.objects.get(name=name)
