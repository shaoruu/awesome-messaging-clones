import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { CREATE_MESSAGE_MUTATION } from '../../../../lib/graphql'
import { withStyles } from '@material-ui/core'

class MessageInputField extends Component {
	state = { message: '' }

	handleChange = event => {
		this.setState({ message: event.target.value })
	}

	handleKeyUp = (event, createMessage, chatroomId) => {
		event.preventDefault()
		if (event.keyCode === 13) {
			createMessage({
				variables: {
					chatroomId: chatroomId,
					message: this.state.message
				}
			})
		}
	}

	render() {
		const { classes, chatroomId } = this.props

		return (
			<Mutation mutation={CREATE_MESSAGE_MUTATION}>
				{createMessage => (
					<>
						<input
							id="message"
							name="message"
							type="text"
							value={this.state.message}
							onChange={this.handleChange}
							onKeyUp={e => this.handleKeyUp(e, createMessage, chatroomId)}
						/>
						<button
							type="submit"
							disabled={!this.state.message}
							className={classes.sendButton}>
							Send
						</button>
					</>
				)}
			</Mutation>
		)
	}
}

const styles = theme => ({
	sendButton: {
		'&:disabled': {
			color: 'red'
		}
	}
})

export default withStyles(styles)(MessageInputField)
