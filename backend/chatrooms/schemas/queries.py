from graphene import relay
import django_filters
from graphene_django import DjangoObjectType

from backend.chatrooms.models import Chatroom


class ChatroomFilter(django_filters.FilterSet):

    class Meta:
        model = Chatroom
        fields = {
            'name': ['exact', 'icontains', 'istartswith']
        }


class ChatroomNode(DjangoObjectType):

    class Meta:
        model = Chatroom
        interfaces = (relay.Node,)
