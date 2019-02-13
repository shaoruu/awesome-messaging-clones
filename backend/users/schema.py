import graphene
from graphene_django.filter import DjangoFilterConnectionField
import graphql_jwt
from graphql_jwt.decorators import login_required

from .schemas.queries import UserFilter, UserNode
from .schemas.mutations import Register, Login
from .schemas.subscriptions import UserSubscriptions
from .models import User as UserModel


class Query(graphene.ObjectType):
    user = graphene.Field(
        UserNode, username=graphene.String(required=True))
    users = DjangoFilterConnectionField(
        UserNode, filterset_class=UserFilter)
    me = graphene.Field(UserNode)

    @login_required
    def resolve_me(self, info):
        return info.context.user

    def resolve_user(self, info, username):
        return UserModel.objects.get(username=username)


class Mutation(graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()

    # Long running refresh tokens
    revoke_token = graphql_jwt.relay.Revoke.Field()


class Subscription(graphene.ObjectType):
    user_subscriptions = UserSubscriptions.Field()
