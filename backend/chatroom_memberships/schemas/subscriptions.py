import graphene

from .queries import ChatroomMembershipNode
from ..models import ChatroomMembership as ChatroomMembershipModel
from backend.graphql_ws import BaseSubscription


class ChatroomMembershipSubscriptions(BaseSubscription):

    ' Fields '
    mutation_type = graphene.String()
    chatroom_membership = graphene.Field(ChatroomMembershipNode)

    @staticmethod
    def subscribe(root, info):
        me = info.context.user
        return ['{}-chatroom-membership-subscription'.format(me.username)]

    @staticmethod
    def publish(payload, info):
        chatroom_member_id = payload.get('chatroom_member_id')

        mutation_type = payload.get('type')
        chatroom_membership = ChatroomMembershipModel.objects.get(
            unique_identifier=chatroom_member_id)

        return ChatroomMembershipSubscriptions(mutation_type=mutation_type, chatroom_membership=chatroom_membership)
