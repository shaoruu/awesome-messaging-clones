from graphene import relay
import django_filters
from graphene_django import DjangoObjectType

from ..models import ChatroomMembership


class ChatroomMembershipFilter(django_filters.FilterSet):

    class Meta:
        model = ChatroomMembership
        fields = {
            'user__username': ['exact', 'icontains', 'istartswith'],
            'chatroom__name': ['exact', 'icontains', 'istartswith']
        }


class ChatroomMembershipNode(DjangoObjectType):

    class Meta:
        model = ChatroomMembership
        interfaces = (relay.Node,)
