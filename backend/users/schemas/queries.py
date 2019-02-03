import graphene
import django_filters
from graphene import relay
from graphene_django import DjangoObjectType
from graphql_jwt.utils import jwt_encode, jwt_payload
from graphql_jwt.decorators import login_required
from backend.users.models import User


class UserFilter(django_filters.FilterSet):

    class Meta:
        model = User
        fields = {
            'username': ['exact', 'icontains', 'istartswith']
        }


class UserNode(DjangoObjectType):
    token = graphene.String()

    class Meta:
        model = User
        interfaces = (relay.Node,)

    @login_required
    def resolve_token(self, info):
        if info.context.user != self:
            return None

        payload = jwt_payload(self)
        return jwt_encode(payload)
