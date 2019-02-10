import graphene
from graphene import relay
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from backend.utils import clean_input
from backend.enums import MutationTypes
from backend.chatroom_members.models import ChatroomMember as ChatroomMemberModel
from ..models import Chatroom as ChatroomModel
from .queries import ChatroomNode
from .subscriptions import ChatroomSubscriptions


class CreateChatroom(relay.ClientIDMutation):
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

        ChatroomSubscriptions.broadcast(
            group='{}-chatroom-subscription'.format(
                info.context.user.username),
            payload={
                "type": MutationTypes.CREATE.name,
                "chatroom_id": new_chatroom.unique_identifier
            }
        )

        return CreateChatroom(chatroom=new_chatroom)


class UpdateChatroom(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")
        name = graphene.String(
            required=True, description="Updated name of the chatroom")

    ' Fields '
    chatroom = graphene.Field(ChatroomNode)

    def mutate_and_get_payload(root, info, **input):
        chatroom = ChatroomModel.objects.get(
            unique_identifier=input.get('chatroom_id'))

        input = clean_input(input)
        chatroom.name = input.get('name')

        chatroom.save()

        ChatroomSubscriptions.broadcast(
            group='{}-chatroom-subscription'.format(
                info.context.user.username),
            payload={
                "type": MutationTypes.UPDATE.name,
                "chatroom_id": chatroom.unique_identifier
            }
        )

        return UpdateChatroom(chatroom=chatroom)


class DeleteChatroom(relay.ClientIDMutation):
    class Input:
        chatroom_id = graphene.String(
            required=True, description="Unique identifier of the chatroom")

    ' Fields '
    successful = graphene.Boolean()

    def mutate_and_get_payload(root, info, **input):
        chatroom = ChatroomModel.objects.get(
            unique_identifier=input.get('chatroom_id'))

        ChatroomSubscriptions.broadcast(
            group='{}-chatroom-subscription'.format(
                info.context.user.username),
            payload={
                "type": MutationTypes.DELETE.name,
                "chatroom_id": input.get('chatroom_id')
            }
        )

        chatroom.delete()

        return DeleteChatroom(successful=True)
