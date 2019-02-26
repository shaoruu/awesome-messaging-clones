import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { withStyles, CircularProgress } from '@material-ui/core'

import { MESSAGES_QUERY, MESSAGE_SUBSCRIPTIONS } from '../../../../lib/graphql'
import MessageList from './MessageList/MessageList'

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

				const {
					mutationType,
					message
				} = subscriptionData.data.messageSubscriptions

				const alteredMessage = {
					node: message,
					__typename: 'MessageNodeEdge'
				}

				if (!prev)
					return {
						messages: {
							edges: [alteredMessage]
						}
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
			<div className={classes.root} onClick={this.props.clicked}>
				<Query
					query={MESSAGES_QUERY}
					variables={{
						first: 50,
						chatroom_UniqueIdentifier: this.props.chatroomId
					}}>
					{({ loading, error, data, subscribeToMore }) => {
						// TODO: Create a loading indication
						if (loading)
							return (
								<div className={classes.progressBarWrapper}>
									<CircularProgress
										size={30}
										thickness={5}
										className={classes.progressBar}
									/>
								</div>
							)
						if (error) {
							console.log(error)
							return <div>Error</div>
						}

						if (!subscribed[this.props.chatroomId] && process.browser)
							this._subscribeToNewMessages(subscribeToMore)

						const { edges: messages } = data.messages

						return <MessageList data={messages} username={username} />
					}}
				</Query>
			</div>
		)
	}
}

const styles = theme => ({
	root: {
		borderRight: '1px solid #CCCCCC',
		display: 'flex',
		flexDirection: 'column-reverse',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100%',
		overflowY: 'auto',
		paddingBottom: 5
	},
	progressBarWrapper: {
		gridRow: '1/16',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	progressBar: {
		color: '#7abfff'
	}
})

export default withStyles(styles)(Messages)
