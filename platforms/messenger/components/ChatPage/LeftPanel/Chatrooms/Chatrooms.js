import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { ME_CHATROOMS_QUERY, CHATROOM_SUBSCRIPTIONS } from '../../../../lib/graphql'
import Chatroom from './Chatroom/Chatroom'

export default class Chatrooms extends Component {
	// _subscribeToNewChatrooms = subscribeToMore => {
	// 	console.log('boo')
	// 	subscribeToMore({
	// 		document: CHATROOM_SUBSCRIPTIONS,
	// 		variables: {
	// 			messagesLast: 1
	// 		},
	// 		updateQuery: (prev, { subscriptionData }) => {
	// 			if (!subscriptionData.data) return prev

	// 			const {
	// 				chatroomSubscriptions: { mutationType, chatroom }
	// 			} = subscriptionData.data

	// 			if (mutationType === 'UPDATE') {
	// 				// remove old chatroom record
	// 				const index = prev.me.chatroomMemberships.edges.findIndex(
	// 					ele =>
	// 						ele.node.chatroom.uniqueIdentifier ===
	// 						chatroom.uniqueIdentifier
	// 				)
	// 				prev.me.chatroomMemberships.edges.unshift(
	// 					prev.me.chatroomMemberships.edges.splice(index, 1)
	// 				)

	// 				prev.me.chatroomMemberships.edges[0].node.chatroom = chatroom

	// 				console.log(chatroom)
	// 				return prev
	// 			}

	// 			return Object.assign({}, prev, {
	// 				me: {
	// 					chatroomMemberships: {
	// 						edges: [
	// 							...prev.me.chatroomMemberships.edges,
	// 							{
	// 								node: { chatroom },
	// 								__typename: 'ChatroomMemberNodeEdge'
	// 							}
	// 						],
	// 						__typename: prev.chatroomMemberships.__typename
	// 					},
	// 					__typename: prev.me.__typename
	// 				}
	// 			})
	// 		}
	// 	})
	// }

	render() {
		return (
			<div>
				<Query
					query={ME_CHATROOMS_QUERY}
					variables={{
						messagesLast: 1,
						chatroomLast: 50
					}}>
					{({ loading, error, data, subscribeToMore }) => {
						// TODO: Create a loading indication
						if (loading) return <div>Fetching</div>
						if (error) {
							console.log(error)
							return <div>Error</div>
						}

						// if (process.browser)
						// 	 this._subscribeToNewChatrooms(subscribeToMore)

						const {
							chatroomMemberships: { edges: chatrooms }
						} = data.me

						// TODO: Add a "no messages" component
						if (!chatrooms) return null

						return (
							<div>
								{chatrooms.map((ele, index) => (
									<Chatroom key={index} data={ele.node} />
								))}
							</div>
						)
					}}
				</Query>
			</div>
		)
	}
}
