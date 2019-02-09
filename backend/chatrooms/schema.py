import graphene
from graphene_django.filter import DjangoFilterConnectionField

from .schemas.queries import ChatroomFilter, ChatroomNode
from .schemas.mutations import CreateChatroom
from .models import Chatroom as ChatroomModel


class Query(graphene.ObjectType):
    chatroom = graphene.Field(
        ChatroomNode, unique_identifier=graphene.String(required=True))
    chatrooms = DjangoFilterConnectionField(
        ChatroomNode, filterset_class=ChatroomFilter)

    def resolve_chatroom(self, info, unique_identifier):
        return ChatroomModel.objects.get(unique_identifier=unique_identifier)


class Mutation(graphene.ObjectType):
    create_chatroom = CreateChatroom.Field()
