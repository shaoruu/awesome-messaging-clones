import graphene
from graphene_django.filter import DjangoFilterConnectionField

from .schemas.queries import MessageFilter, MessageNode
from .schemas.mutations import CreateMessage, UpdateMessage
from .models import Message as MessageModel


class Query(graphene.ObjectType):
    message = graphene.Field(
        MessageNode, unique_identifier=graphene.String(required=True))
    messages = DjangoFilterConnectionField(
        MessageNode, filterset_class=MessageFilter)

    def resolve_message(self, info, unique_identifier):
        return MessageModel.objects.get(unique_identifier=unique_identifier)


class Mutation(graphene.ObjectType):
    create_message = CreateMessage.Field()
    update_message = UpdateMessage.Field()
