from graphene import relay
import django_filters
from graphene_django import DjangoObjectType
from backend.chatrooms.models import Chatroom, ChatroomMember


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


class ChatroomMemberNode(DjangoObjectType):

    class Meta:
        model = ChatroomMember
        interfaces = (relay.Node,)
