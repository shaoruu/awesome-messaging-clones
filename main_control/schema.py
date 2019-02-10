import graphene
import graphql_jwt

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
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()

    # Long running refresh tokens
    revoke_token = graphql_jwt.relay.Revoke.Field()


class Subscription(backend.chatrooms.schema.Subscription,
                   backend.messages.schema.Subscription,
                   backend.users.schema.Subscription,
                   graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         subscription=Subscription)
