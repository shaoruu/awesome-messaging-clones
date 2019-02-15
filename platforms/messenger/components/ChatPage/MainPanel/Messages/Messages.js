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
					messageSubscriptions: { mutationType, message }
				} = subscriptionData.data

				return Object.assign({}, prev, {
					messages: {
						edges: [
							...prev.messages.edges,
							{
								node: message,
								__typename: 'MessageNodeEdge'
							}
						],
						__typename: prev.messages.__typename
					}
				})
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
							<div>
								{messages.map((ele, index) => (
									<Message key={index} message={ele.node.message} />
								))}
							</div>
						)
					}}
				</Query>
			</div>
		)
	}
}
