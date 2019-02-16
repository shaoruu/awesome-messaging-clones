import graphene
from graphene import relay
from graphql import GraphQLError

from backend.chatrooms.models import Chatroom as ChatroomModel
from backend.enums import MutationTypes
from ..models import ChatroomMembership as ChatroomMembershipModel
from .queries import ChatroomMembershipNode
from .subscriptions import ChatroomMembershipSubscriptions


class JoinChatroom(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")

    ' Fields '
    chatroom_membership = graphene.Field(ChatroomMembershipNode)

    def mutate_and_get_payload(root, info, **input):
        if ChatroomMembershipModel.objects.filter(
                user__username=info.context.user.username,
                chatroom__unique_identifier=input.get('chatroom_id')).exists():
            raise GraphQLError("Already Joined.")

        chatroom = ChatroomModel.objects.get(
            unique_identifier=input.get('chatroom_id'))

        new_chatroom_membership = ChatroomMembershipModel(
            user=info.context.user,
            chatroom=chatroom
        )
        new_chatroom_membership.save()

        ChatroomMembershipSubscriptions.broadcast(
            group='{}-chatroom-membership-subscription'.format(
                info.context.user.username),
            payload={
                "type": MutationTypes.CREATE.name,
                "chatroom_membership_id": new_chatroom_membership.unique_identifier
            }
        )

        return JoinChatroom(chatroom_membership=new_chatroom_membership)


class LeaveChatroom(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")

    ' Fields '
    successful = graphene.Boolean()

    def mutate_and_get_payload(root, info, **input):
        chatroom_membership = ChatroomMembershipModel.objects.get(
            user__username=info.context.user.username,
            chatroom__unique_identifier=input.get('chatroom_id'))

        chatroom_membership.delete()
        return LeaveChatroom(successful=True)
