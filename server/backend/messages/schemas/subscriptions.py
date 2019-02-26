import graphene

from .queries import MessageNode
from ..models import Message as MessageModel
from backend.graphql_ws import BaseSubscription


class MessageSubscriptions(BaseSubscription):

    class Arguments:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom to listen on")

    ' Fields '
    mutation_type = graphene.String()
    message = graphene.Field(MessageNode)

    @staticmethod
    def subscribe(root, info, chatroom_id):
        return ['{}-message-subscription'.format(chatroom_id)]

    @staticmethod
    def publish(payload, info, chatroom_id):
        message_id = payload.get('message_id')

        mutation_type = payload.get('type')
        message = MessageModel.objects.get(unique_identifier=message_id)

        return MessageSubscriptions(mutation_type=mutation_type, message=message)
