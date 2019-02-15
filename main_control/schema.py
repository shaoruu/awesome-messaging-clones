import graphene

import backend.chatrooms.schema
import backend.messages.schema
import backend.users.schema
import backend.chatroom_memberships.schema


class Query(backend.chatrooms.schema.Query,
            backend.chatroom_memberships.schema.Query,
            backend.messages.schema.Query,
            backend.users.schema.Query,
            graphene.ObjectType):
    pass


class Mutation(backend.chatrooms.schema.Mutation,
               backend.chatroom_memberships.schema.Mutation,
               backend.messages.schema.Mutation,
               backend.users.schema.Mutation,
               graphene.ObjectType):
    pass


class Subscription(backend.chatrooms.schema.Subscription,
                   backend.chatroom_memberships.schema.Subscription,
                   backend.messages.schema.Subscription,
                   backend.users.schema.Subscription,
                   graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         subscription=Subscription)
