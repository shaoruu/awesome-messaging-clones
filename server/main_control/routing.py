from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

from backend.graphql_ws import GraphQLSubscriptionConsumer
from .schema import schema


class GraphQLConsumer(GraphQLSubscriptionConsumer):
    schema = schema

    async def on_connect(self, payload):
        print("New client connected!")


application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
                path("subscriptions/", GraphQLConsumer),
            ])
        )
    )
})
