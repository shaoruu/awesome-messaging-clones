from graphene import relay
import django_filters
from graphene_django import DjangoObjectType

from backend.chatroom_members.models import ChatroomMember


class ChatroomMemberFilter(django_filters.FilterSet):

    class Meta:
        model = ChatroomMember
        fields = {
            'user__username': ['exact', 'icontains', 'istartswith'],
            'chatroom__name': ['exact', 'icontains', 'istartswith']
        }


class ChatroomMemberNode(DjangoObjectType):

    class Meta:
        model = ChatroomMember
        interfaces = (relay.Node,)
