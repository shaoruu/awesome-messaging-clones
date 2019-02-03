import graphene
import backend.chatrooms.schema
import backend.messages.schema
import backend.users.schema


class Query(backend.chatrooms.schema.Query, backend.messages.schema.Query, backend.users.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
