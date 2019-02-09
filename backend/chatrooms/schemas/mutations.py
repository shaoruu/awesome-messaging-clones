import graphene
from graphene import relay
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from backend.utils import clean_input
from backend.chatroom_members.models import ChatroomMember as ChatroomMemberModel
from ..models import Chatroom as ChatroomModel
from .queries import ChatroomNode


class CreateChatroom(graphene.relay.ClientIDMutation):
    class Input:
        name = graphene.String(
            required=True, description="Name of the chatroom")

    ' Fields '
    chatroom = graphene.Field(ChatroomNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        input = clean_input(input)

        # creation of chatroom
        new_chatroom = ChatroomModel(name=input.get('name'))
        new_chatroom.save()

        # adding the creator to the chatroom
        chatroom_member = ChatroomMemberModel(
            chatroom=new_chatroom, user=info.context.user)
        chatroom_member.save()

        return CreateChatroom(chatroom=new_chatroom)
