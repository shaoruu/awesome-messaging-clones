import graphene

from .queries import MessageNode
from ..models import Message as MessageModel
from backend.graphql_ws import BaseSubscription


class NewMessageCreation(BaseSubscription):

    class Arguments:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom to listen on")

    ' Fields '
    message = graphene.Field(MessageNode)

    @staticmethod
    def subscribe(root, info, chatroom_id):
        return ['{}-subscription'.format(chatroom_id)]

    @staticmethod
    def publish(message_id, info, chatroom_id):
        message = MessageModel.objects.get(unique_identifier=message_id)

        return NewMessageCreation(message=message)
