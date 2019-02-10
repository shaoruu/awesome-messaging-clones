import graphene
from graphene_django.filter import DjangoFilterConnectionField

from .schemas.queries import UserFilter, UserNode
from .schemas.mutations import Register, Login, Logout
from .schemas.subscriptions import NewUserSubscription
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

    def resolve_user(self, info, username):
        return UserModel.objects.get(username=username)


class Mutation(graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    logout = Logout.Field()


class Subscription(graphene.ObjectType):
    new_user_subscription = NewUserSubscription.Field()
