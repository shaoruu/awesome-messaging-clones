import graphene
from graphene import relay
from graphql import GraphQLError

from backend.chatrooms.models import Chatroom as ChatroomModel
from backend.chatrooms.schemas.subscriptions import ChatroomSubscriptions
from backend.users.models import User as UserModel
from backend.enums import MutationTypes
from ..models import ChatroomMembership as ChatroomMembershipModel
from .queries import ChatroomMembershipNode
from .subscriptions import ChatroomMembershipSubscriptions


class CreateChatroomMembership(relay.ClientIDMutation):
    class Input:
        username = graphene.String(
            required=True, description="Username of the user")
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")

    ' Fields '
    chatroom_membership = graphene.Field(ChatroomMembershipNode)

    def mutate_and_get_payload(root, info, **input):
        if ChatroomMembershipModel.objects.filter(
                user__username=input.get('username'),
                chatroom__unique_identifier=input.get('chatroom_id')).exists():
            raise GraphQLError("Already Joined.")

        chatroom = ChatroomModel.objects.get(
            unique_identifier=input.get('chatroom_id'))
        user = UserModel.objects.get(username=input.get('username'))

        new_chatroom_membership = ChatroomMembershipModel(
            user=user,
            chatroom=chatroom
        )
        new_chatroom_membership.save()

        ChatroomMembershipSubscriptions.broadcast(
            group='{}-chatroom-membership-subscription'.format(user.username),
            payload={
                "type": MutationTypes.CREATE.name,
                "chatroom_membership_id": new_chatroom_membership.unique_identifier
            }
        )

        ChatroomSubscriptions.broadcast(
            group='{}-chatroom-subscription'.format(
                chatroom.unique_identifier),
            payload={
                "type": MutationTypes.UPDATE.name,
                "chatroom_id": chatroom.unique_identifier
            }
        )

        return CreateChatroomMembership(chatroom_membership=new_chatroom_membership)


class DeleteChatroomMembership(relay.ClientIDMutation):
    class Input:
        username = graphene.String(
            required=True, description="Username of the user")
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")

    ' Fields '
    successful = graphene.Boolean()

    def mutate_and_get_payload(root, info, **input):
        chatroom_membership = ChatroomMembershipModel.objects.get(
            user__username=input.get('username'),
            chatroom__unique_identifier=input.get('chatroom_id'))

        ChatroomMembershipSubscriptions.broadcast(
            group='{}-chatroom-membership-subscription'.format(
                input.get('username')),
            payload={
                "type": MutationTypes.DELETE.name,
                "chatroom_membership_id": chatroom_membership.unique_identifier
            }
        )

        chatroom_membership.delete()
        return DeleteChatroomMembership(successful=True)
