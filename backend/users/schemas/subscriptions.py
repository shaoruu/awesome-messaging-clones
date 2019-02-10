import graphene

from .queries import UserNode
from ..models import User as UserModel
from backend.graphql_ws import BaseSubscription


class NewUserRegistration(BaseSubscription):

    ' Fields '
    user = graphene.Field(UserNode)

    @staticmethod
    def subscribe(root, info):
        return ['new_users-subscription']

    @staticmethod
    def publish(username, info):
        user = UserModel.objects.get(username=username)

        return NewUserRegistration(user=user)
