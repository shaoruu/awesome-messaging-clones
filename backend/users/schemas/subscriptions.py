import graphene

from .queries import UserNode
from ..models import User as UserModel
from backend.graphql_ws import BaseSubscription


class NewUserSubscription(BaseSubscription):

    ' Fields '
    user = graphene.Field(UserNode)

    @staticmethod
    def subscribe(root, info):
        return ['new_users']

    @staticmethod
    def publish(username, info):
        user = UserModel.objects.get(username=username)

        return NewUserSubscription(user=user)
