import graphene
from graphene_django.filter import DjangoFilterConnectionField

from .schemas.queries import UserFilter, UserNode
from .models import User as UserModel
from graphql_jwt.decorators import login_required


class Query(graphene.ObjectType):
    user = graphene.Field(
        UserNode, username=graphene.String(required=True))
    users = DjangoFilterConnectionField(
        UserNode, filterset_class=UserFilter)
    me = graphene.Field(UserNode)

    @login_required
    def resolve_me(self, info):
        return info.context.user

    def resolve_users(self, username):
        return UserModel.objects.get(username=username)
