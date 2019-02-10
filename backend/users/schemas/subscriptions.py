import graphene

from .queries import UserNode
from ..models import User as UserModel
from backend.graphql_ws import BaseSubscription


class UserSubscriptions(BaseSubscription):

    ' Fields '
    mutation_type = graphene.String()
    user = graphene.Field(UserNode)

    @staticmethod
    def subscribe(root, info):
        return ['users-subscription']

    @staticmethod
    def publish(payload, info):
        username = payload.get('username')

        mutation_type = payload.get('type')
        user = UserModel.objects.get(username=username)

        return UserSubscriptions(mutation_type=mutation_type, user=user)
