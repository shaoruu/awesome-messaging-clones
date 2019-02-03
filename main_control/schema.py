import graphene
import backend.chatrooms.schema


class Query(backend.chatrooms.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
