import graphene
from graphene import relay
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from backend.chatrooms.models import Chatroom as ChatroomModel
from ..models import ChatroomMember as ChatroomMemberModel
from .queries import ChatroomMemberNode


class JoinChatroom(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")

    ' Fields '
    chatroom_membership = graphene.Field(ChatroomMemberNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        if ChatroomMemberModel.objects.filter(
                user__username=info.context.user.username,
                chatroom__unique_identifier=input.get('chatroom_id')).exists():
            raise GraphQLError("Already Joined.")

        chatroom = ChatroomModel.objects.get(
            unique_identifier=input.get('chatroom_id'))

        new_chatroom_membership = ChatroomMemberModel(
            user=info.context.user,
            chatroom=chatroom
        )
        new_chatroom_membership.save()

        return JoinChatroom(chatroom_membership=new_chatroom_membership)


class LeaveChatroom(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")

    ' Fields '
    successful = graphene.Boolean()

    def mutate_and_get_payload(root, info, **input):
        chatroom_membership = ChatroomMemberModel.objects.get(
            user__username=info.context.user.username,
            chatroom__unique_identifier=input.get('chatroom_id'))

        chatroom_membership.delete()
        return LeaveChatroom(successful=True)
