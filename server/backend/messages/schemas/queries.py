import django_filters
from graphene import relay
from graphene_django import DjangoObjectType
from django.conf import settings

from backend.messages.models import Message


class MessageFilter(django_filters.FilterSet):

    class Meta:
        model = Message
        fields = {
            'message': ['exact', 'icontains'],
            'sender__user__username': ['exact', 'icontains', 'istartswith'],
            'chatroom__name': ['exact', 'icontains', 'istartswith'],
            'chatroom__unique_identifier': ['exact']
        }


class MessageNode(DjangoObjectType):

    class Meta:
        model = Message
        interfaces = (relay.Node,)
