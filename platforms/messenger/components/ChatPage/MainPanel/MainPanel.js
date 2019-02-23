import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core'

import Messages from './Messages/Messages'
import MessageInputField from './MessageInputField/MessageInputField'

class MainPanel extends Component {
	componentDidMount() {
		this.inputElement.focus()
	}

	componentDidUpdate() {
		this.inputElement.focus()
	}

	handleInputClick = () => {
		this.inputElement.focus()
	}

	render() {
		if (!this.props.chatroomId) return null
		return (
			<div className={this.props.className}>
				<Messages
					chatroomId={this.props.chatroomId}
					username={this.props.username}
					clicked={this.handleInputClick}
				/>
				<MessageInputField
					chatroomId={this.props.chatroomId}
					inputRef={el => (this.inputElement = el)}
				/>
			</div>
		)
	}
}

const styles = theme => ({})

export default withApollo(withStyles(styles)(MainPanel))
