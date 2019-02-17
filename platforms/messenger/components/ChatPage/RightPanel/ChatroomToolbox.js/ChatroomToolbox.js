import { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	Button
} from '@material-ui/core'

import { CHATROOM_QUERY, CHATROOM_SUBSCRIPTIONS } from '../../../../lib/graphql'
import {
	CREATE_CHATROOM_MEMBERSHIP_MUTATION,
	UPDATE_CHATROOM_MUTATION
} from '../../../../lib/graphql/mutations'
import MemberList from './MemberList/MemberList'
import { redirect } from '../../../../lib/utils'

let subscribed = {}

export default class ChatroomToolbox extends Component {
	state = {
		open: false,
		addName: '',
		changeName: ''
	}

	_subscribeToMoreNewsFromChatroom = subscribeToMore => {
		subscribed[this.props.chatroomId] = true
		subscribeToMore({
			document: CHATROOM_SUBSCRIPTIONS,
			variables: {
				chatroomId: this.props.chatroomId
			},
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev
				const {
					mutationType,
					chatroom
				} = subscriptionData.data.chatroomSubscriptions

				switch (mutationType) {
					case 'CREATE':
						break
					case 'UPDATE':
						return { chatroom }
					case 'DELETE':
						break
					default:
						return prev
				}
			}
		})
	}

	handleClickOpen = () => {
		this.setState({ open: true })
	}

	handleAddChange = e => {
		this.setState({ addName: e.target.value })
	}

	handleAdd = (_, createChatroomMembership) => {
		if (this.state.addName !== '') {
			createChatroomMembership({
				variables: {
					chatroomId: this.props.chatroomId,
					username: this.state.addName
				}
			})
		}
		this.handleClose()
	}

	handleClose = () => {
		console.log(this.state.addName)
		this.setState({ open: false, addName: '' })
	}

	handleChangeNameChange = e => {
		this.setState({ changeName: e.target.value })
	}

	handleKeyUp = (e, updateChatroom) => {
		e.preventDefault()
		if (e.keyCode === 13) {
			updateChatroom({
				variables: {
					chatroomId: this.props.chatroomId,
					name: this.state.changeName
				}
			})
			this.setState({ changeName: '' })
		} else this.handleChangeNameChange(e)
	}

	render() {
		const { chatroomId } = this.props
		return (
			<Query query={CHATROOM_QUERY} variables={{ uniqueIdentifier: chatroomId }}>
				{({ loading, data, error, subscribeToMore }) => {
					if (loading) return null

					if (!data) {
						redirect({}, '/chat')
						return null
					}

					if (!subscribed[chatroomId] && process.browser)
						this._subscribeToMoreNewsFromChatroom(subscribeToMore)

					const {
						chatroom: { name: chatroomName }
					} = data

					return (
						<div>
							<h3>{chatroomName}</h3>
							<Mutation mutation={UPDATE_CHATROOM_MUTATION}>
								{updateChatroom => {
									return (
										<input
											type="text"
											value={this.state.changeName}
											onChange={this.handleChangeNameChange}
											onKeyUp={e =>
												this.handleKeyUp(e, updateChatroom)
											}
										/>
									)
								}}
							</Mutation>
							<button onClick={this.handleClickOpen}>add people</button>
							<Dialog
								open={this.state.open}
								onClose={this.handleClose}
								aria-labelledby="form-dialog-title">
								<DialogTitle id="form-dialog-title">
									Add More People
								</DialogTitle>
								<DialogContent>
									<DialogContentText>Add to group:</DialogContentText>
									<TextField
										autoFocus
										margin="dense"
										id="name"
										label="Add to group:"
										type="text"
										fullWidth
										value={this.state.addName}
										onChange={this.handleAddChange}
									/>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleClose} color="primary">
										Cancel
									</Button>
									<Mutation
										mutation={CREATE_CHATROOM_MEMBERSHIP_MUTATION}
										onError={error => console.log(error)}>
										{createChatroomMembership => {
											return (
												<Button
													onClick={e =>
														this.handleAdd(
															e,
															createChatroomMembership
														)
													}
													color="primary">
													Add
												</Button>
											)
										}}
									</Mutation>
								</DialogActions>
							</Dialog>
							<MemberList data={data.chatroom.memberships} />
						</div>
					)
				}}
			</Query>
		)
	}
}
