import graphene
from graphene import relay
from graphql import GraphQLError

from backend.utils import clean_input
from backend.enums import MutationTypes
from backend.chatrooms.models import Chatroom as ChatroomModel
from backend.chatroom_memberships.models import ChatroomMembership as ChatroomMembershipModel
from backend.chatroom_memberships.schemas.subscriptions import ChatroomMembershipSubscriptions
from ..models import Message as MessageModel
from .queries import MessageNode
from .subscriptions import MessageSubscriptions


class CreateMessage(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Chatroom's unique identifier")
        message = graphene.String(required=True, description="Message body")

    ' Fields '
    message = graphene.Field(MessageNode)

    def mutate_and_get_payload(root, info, **input):
        chatroom = ChatroomModel.objects.get(
            unique_identifier=input.pop('chatroom_id'))
        sent_user = info.context.user
        chatroom_membership = ChatroomMembershipModel.objects.get(
            chatroom=chatroom, user=sent_user)

        input = clean_input(input)

        new_message = MessageModel(message=input.get(
            'message'), sender=chatroom_membership, chatroom=chatroom)
        new_message.save()

        MessageSubscriptions.broadcast(
            group='{}-message-subscription'.format(chatroom.unique_identifier),
            payload={
                "type": MutationTypes.CREATE.name,
                "message_id": new_message.unique_identifier
            }
        )

        for membership in ChatroomMembershipModel.objects.filter(chatroom__unique_identifier=chatroom.unique_identifier):
            ChatroomMembershipSubscriptions.broadcast(
                group='{}-chatroom-membership-subscription'.format(
                    membership.user.username),
                payload={
                    "type": MutationTypes.UPDATE.name,
                    "chatroom_membership_id": membership.unique_identifier
                }

            )

        return CreateMessage(message=new_message)


class UpdateMessage(relay.ClientIDMutation):
    class Input:
        message_id = graphene.String(
            required=True, description="Unique identifier of the specified message")
        message = graphene.String(required=True, description="Updated message")

    ' Fields '
    message = graphene.Field(MessageNode)

    def mutate_and_get_payload(root, info, **input):
        message = MessageModel.objects.get(
            unique_identifier=input.pop('message_id'))

        input = clean_input(input)
        message.message = input.get('message')

        message.save()

        MessageSubscriptions.broadcast(
            group='{}-message-subscription'.format(
                message.chatroom.unique_identifier),
            payload={
                "type": MutationTypes.UPDATE.name,
                "message_id": message.unique_identifier
            }
        )

        return UpdateMessage(message=message)


class DeleteMessage(relay.ClientIDMutation):
    class Input:
        message_id = graphene.String(
            required=True, description="Unique identifier of the message")

    ' Fields '
    successful = graphene.Boolean()

    def mutate_and_get_payload(root, info, **input):
        message = MessageModel.objects.get(
            unique_identifier=input.get('message_id'))

        MessageSubscriptions.broadcast(
            group='{}-message-subscription'.format(
                message.chatroom.unique_identifier),
            payload={
                "type": MutationTypes.DELETE.name,
                "message_id": input.get('message_id')
            }
        )

        message.delete()

        return DeleteMessage(successful=True)
