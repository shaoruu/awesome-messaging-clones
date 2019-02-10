import graphene

from .queries import ChatroomNode
from ..models import Chatroom as ChatroomModel
from backend.graphql_ws import BaseSubscription


class ChatroomSubscriptions(BaseSubscription):

    ' Fields '
    mutation_type = graphene.String()
    chatroom = graphene.Field(ChatroomNode)

    @staticmethod
    def subscribe(root, info):
        me = info.context.user
        return ['{}-chatroom-subscription'.format(me.username)]

    @staticmethod
    def publish(payload, info):
        chatroom_id = payload.get('chatroom_id')

        mutation_type = payload.get('type')
        chatroom = ChatroomModel.objects.get(unique_identifier=chatroom_id)

        return ChatroomSubscriptions(mutation_type=mutation_type, chatroom=chatroom)
