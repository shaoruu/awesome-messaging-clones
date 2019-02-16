import React, { Component } from 'react'
import { Query } from 'react-apollo'

import {
	CHATROOM_MEMBERSHIPS_QUERY,
	CHATROOM_MEMBERSHIP_SUBSCRIPTIONS
} from '../../../../lib/graphql'
import Chatroom from './Chatroom/Chatroom'

let subscribed = {}

export default class Chatrooms extends Component {
	_subscribeToNewChatroomMemberships = subscribeToMore => {
		subscribed[this.props.username] = subscribeToMore({
			document: CHATROOM_MEMBERSHIP_SUBSCRIPTIONS,
			variables: {
				messagesLast: 1,
				username: this.props.username
			},
			updateQuery: (prev, { subscriptionData }) => {
				console.log('yo wtf')

				if (!subscriptionData.data) return prev

				const {
					mutationType,
					chatroomMembership
				} = subscriptionData.data.chatroomMembershipSubscriptions

				const alteredChatroomMembership = {
					node: chatroomMembership,
					__typename: 'ChatroomMembershipNodeConnection'
				}

				switch (mutationType) {
					case 'CREATE':
						prev.chatroomMemberships.edges.unshift(alteredChatroomMembership)
						return prev
					case 'UPDATE':
						prev.chatroomMemberships.edges = prev.chatroomMemberships.edges.filter(
							ele =>
								ele.node.uniqueIdentifier !==
								chatroomMembership.uniqueIdentifier
						)
						prev.chatroomMemberships.edges.unshift(alteredChatroomMembership)
						return prev
					case 'DELETE':
						return prev.chatroomMemberships.edges.filter(
							ele =>
								ele.node.uniqueIdentifier !==
								chatroomMembership.uniqueIdentifier
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
					query={CHATROOM_MEMBERSHIPS_QUERY}
					variables={{
						messagesLast: 1,
						last: 50,
						user_Username: this.props.username
					}}>
					{({ loading, error, data, subscribeToMore }) => {
						// TODO: Create a loading indication
						if (loading) return <div>Fetching</div>
						if (error) {
							console.log(error)
							return <div>Error</div>
						}

						if (!subscribed[this.props.username] && process.browser)
							this._subscribeToNewChatroomMemberships(subscribeToMore)

						const { edges: chatrooms } = data.chatroomMemberships

						// TODO: Add a "no messages" component
						if (!chatrooms) return null

						return (
							<div>
								<ul>
									{chatrooms.map((ele, index) => (
										<Chatroom key={index} data={ele.node} />
									))}
								</ul>
							</div>
						)
					}}
				</Query>
			</div>
		)
	}
}
