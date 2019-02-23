import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { CREATE_MESSAGE_MUTATION } from '../../../../lib/graphql'
import { withStyles } from '@material-ui/core'

class MessageInputField extends Component {
	constructor(props) {
		super(props)

		this.state = { message: '' }
	}

	handleChange = event => {
		this.setState({ message: event.target.value })
	}

	handleKeyUp = (event, createMessage, chatroomId) => {
		event.preventDefault()
		if (!event.shiftKey && event.keyCode === 13 && event.target.value !== '') {
			createMessage({
				variables: {
					chatroomId: chatroomId,
					message: this.state.message.trim()
				}
			})
			this.setState({ message: '' })
		}
	}

	render() {
		const { classes, chatroomId } = this.props

		return (
			<Mutation mutation={CREATE_MESSAGE_MUTATION}>
				{createMessage => (
					<div className={classes.navRoot}>
						<input
							id="message"
							name="message"
							type="text"
							autoComplete="off"
							minRows="1"
							maxRows="5"
							value={this.state.message}
							onChange={this.handleChange}
							placeholder="Type a message..."
							onKeyUp={e => this.handleKeyUp(e, createMessage, chatroomId)}
							className={classes.inputField}
							ref={this.props.inputRef}
						/>
						<div className={classes.buttons}>
							<button
								type="submit"
								disabled={!this.state.message}
								className={classes.sendButton}>
								Send
							</button>
						</div>
					</div>
				)}
			</Mutation>
		)
	}
}

const styles = theme => ({
	navRoot: {
		width: '100%',
		minHeight: 50,
		// overflow: 'scroll',
		maxHeight: 'auto',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTop: '1px solid #CCCCCC',
		borderRight: '1px solid #CCCCCC',
		verticalAlign: 'middle'
	},
	sendButton: {
		fontSize: 14,
		fontWeight: 550,
		color: '#0084ff',
		// padding: 5,
		background: 'transparent',
		border: 'none',
		'&:disabled': {
			color: 'gray'
		}
	},
	inputField: {
		border: 'none',
		background: 'transparent',
		flex: '0 0 80%',
		fontSize: 14,
		padding: 5,
		marginLeft: 10,
		'&:focus': {
			outline: 'none'
		},
		'&::placeholder': {
			color: 'rgba(0, 0, 0, 0.2)'
		}
	},
	buttons: {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		margin: '0 15px',
		width: '100%'
	}
})

export default withStyles(styles)(MessageInputField)
