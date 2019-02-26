import graphene

from .queries import ChatroomNode
from ..models import Chatroom as ChatroomModel
from backend.graphql_ws import BaseSubscription


class ChatroomSubscriptions(BaseSubscription):

    class Arguments:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom to listen on")

    ' Fields '
    mutation_type = graphene.String()
    chatroom = graphene.Field(ChatroomNode)

    @staticmethod
    def subscribe(root, info, chatroom_id):
        return ['{}-chatroom-subscription'.format(chatroom_id)]

    @staticmethod
    def publish(payload, info, **kwargs):
        # overwriting chatroom_id to publish to the right channel
        chatroom_id = payload.get('chatroom_id')

        mutation_type = payload.get('type')
        chatroom = ChatroomModel.objects.get(unique_identifier=chatroom_id)

        return ChatroomSubscriptions(mutation_type=mutation_type, chatroom=chatroom)
