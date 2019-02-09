import graphene
from graphene import relay
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from backend.utils import clean_input
from backend.chatrooms.models import Chatroom as ChatroomModel
from ..models import Message as MessageModel
from .queries import MessageNode


class CreateMessage(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Chatroom's unique identifier")
        message = graphene.String(required=True, description="Message body")

    ' Fields '
    message = graphene.Field(MessageNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        chatroom = ChatroomModel.objects.get(
            unique_identifier=input.pop('chatroom_id'))
        sent_user = info.context.user

        input = clean_input(input)

        new_message = MessageModel(message=input.get(
            'message'), user=sent_user, chatroom=chatroom)
        new_message.save()

        return CreateMessage(message=new_message)


class UpdateMessage(relay.ClientIDMutation):
    class Input:
        message_id = graphene.String(
            required=True, description="Unique identifier of the specified message")
        message = graphene.String(required=True, description="Updated message")

    ' Fields '
    message = graphene.Field(MessageNode)

    def mutate_and_get_payload(root, info, **input):
        input = clean_input(input)

        message = MessageModel.objects.get(
            unique_identifier=input.get('message_id'))
        message.message = input.get('message')

        message.save()
        return UpdateMessage(message=message)
