import graphene
from rx import Observable

import backend.chatrooms.schema
import backend.messages.schema
import backend.users.schema
import backend.chatroom_members.schema


class Query(backend.chatrooms.schema.Query,
            backend.chatroom_members.schema.Query,
            backend.messages.schema.Query,
            backend.users.schema.Query,
            graphene.ObjectType):
    pass


class Mutation(backend.chatrooms.schema.Mutation,
               backend.chatroom_members.schema.Mutation,
               backend.messages.schema.Mutation,
               backend.users.schema.Mutation,
               graphene.ObjectType):
    pass


class Subscription(backend.users.schema.Subscription,
                   graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         subscription=Subscription)
