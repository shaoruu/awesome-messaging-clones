import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { MESSAGES_QUERY, MESSAGE_SUBSCRIPTIONS } from '../../../../lib/graphql'
import Message from './Message/Message'

export default class Messages extends Component {
	_subscribeToNewMessages = subscribeToMore => {
		subscribeToMore({
			document: MESSAGE_SUBSCRIPTIONS,
			variables: {
				chatroomId: this.props.chatroomId
			},
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev

				const {
					mutationType,
					message
				} = subscriptionData.data.messageSubscriptions

				const alteredMessage = {
					node: message,
					__typename: 'MessageNodeEdge'
				}

				switch (mutationType) {
					case 'CREATE':
						prev.messages.edges.push(alteredMessage)
						return prev
					case 'UPDATE':
						const index = prev.messages.edges.findIndex(
							ele => ele.node.uniqueIdentifier === message.uniqueIdentifier
						)
						prev.messages.edges[index] = alteredMessage
						return prev
					case 'DELETE':
						return prev.messages.edges.filter(
							ele => ele.node.uniqueIdentifier !== message.uniqueIdentifier
						)
					default:
						return prev
				}
			}
		})
	}

	render() {
		return (
			<div>
				<Query
					query={MESSAGES_QUERY}
					variables={{
						last: 50,
						chatroom_UniqueIdentifier: this.props.chatroomId
					}}>
					{({ loading, error, data, subscribeToMore }) => {
						// TODO: Create a loading indication
						if (loading) return <div>Fetching</div>
						if (error) {
							console.log(error)
							return <div>Error</div>
						}

						if (process.browser) this._subscribeToNewMessages(subscribeToMore)

						const { edges: messages } = data.messages

						return (
							<ul>
								{messages.map((ele, index) => (
									<Message key={index} data={ele.node} />
								))}
							</ul>
						)
					}}
				</Query>
			</div>
		)
	}
}
