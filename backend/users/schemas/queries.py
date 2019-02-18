import graphene
import django_filters
from graphene import relay
from graphene_django import DjangoObjectType
from graphql_jwt.utils import jwt_encode, jwt_payload

from backend.users.models import User
from backend.utils import image_as_base64


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

    def resolve_token(self, info):
        if info.context.user != self:
            return None

        payload = jwt_payload(self)
        return jwt_encode(payload)

    def resolve_image(self, info):
        return image_as_base64(self.image.path)
