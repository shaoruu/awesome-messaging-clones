import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { MESSAGES_QUERY, MESSAGE_SUBSCRIPTIONS } from '../../../../lib/graphql'
import Message from './Message/Message'
import { withStyles } from '@material-ui/core'
import { EEXIST } from 'constants'

let subscribed = {}

class Messages extends Component {
	_subscribeToNewMessages = subscribeToMore => {
		subscribed[this.props.chatroomId] = true
		subscribeToMore({
			document: MESSAGE_SUBSCRIPTIONS,
			variables: {
				chatroomId: this.props.chatroomId
			},
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev

				console.log('hi')

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
						prev.messages.edges.unshift(alteredMessage)
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

	componentWillMount() {
		subscribed = {}
	}

	render() {
		const { classes, username } = this.props

		return (
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

					if (!subscribed[this.props.chatroomId] && process.browser)
						this._subscribeToNewMessages(subscribeToMore)

					const { edges: messages } = data.messages

					return (
						<ul className={classes.messagesWrapper}>
							{messages.map((ele, index) => {
								let specialStyle = []
								const { username: sender } = ele.node.sender.user

								if (index === 0) specialStyle.push('first')
								if (
									index !== 0 &&
									sender !==
										messages[index - 1].node.sender.user.username
								)
									specialStyle.push('first')
								if (
									index !== messages.length - 1 &&
									sender !==
										messages[index + 1].node.sender.user.username
								)
									specialStyle.push('last')
								if (index === messages.length - 1)
									specialStyle.push('last')

								return (
									<Message
										key={index}
										data={ele.node}
										username={username}
										specialStyle={specialStyle}
									/>
								)
							})}
						</ul>
					)
				}}
			</Query>
		)
	}
}

const styles = theme => ({
	messagesWrapper: {
		listStyle: 'none',
		display: 'flex',
		flexDirection: 'column-reverse',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		height: '100%',
		gridRow: '1/16',
		overflowY: 'scroll',

		borderBottom: '1px solid #CCCCCC',
		borderLeft: '1px solid #CCCCCC'
	}
})

export default withStyles(styles)(Messages)
