import graphene
from graphene_django.filter import DjangoFilterConnectionField

from .schemas.queries import ChatroomMemberFilter, ChatroomMemberNode
from .schemas.mutations import JoinChatroom, LeaveChatroom
from .models import ChatroomMember as ChatroomMemberModel


class Query(graphene.ObjectType):
    chatroom_member = graphene.Field(
        ChatroomMemberNode, unique_identifier=graphene.String(required=True))
    chatroom_members = DjangoFilterConnectionField(
        ChatroomMemberNode, filterset_class=ChatroomMemberFilter)

    def resolve_chatroom_member(self, info, unique_identifier):
        return ChatroomMemberModel.objects.get(unique_identifier=unique_identifier)


class Mutation(graphene.ObjectType):
    join_chatroom = JoinChatroom.Field()
    leave_chatroom = LeaveChatroom.Field()
