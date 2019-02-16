import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core'

import Messages from './Messages/Messages'
import MessageInputField from './MessageInputField/MessageInputField'

class MainPanel extends Component {
	render() {
		if (!this.props.chatroomId) return <h1>SHIT</h1>
		console.log(this.props.chatroomId)
		return (
			<div className={this.props.className}>
				<Messages chatroomId={this.props.chatroomId} />
				<MessageInputField chatroomId={this.props.chatroomId} />
			</div>
		)
	}
}

const styles = theme => ({})

export default withApollo(withStyles(styles)(MainPanel))
