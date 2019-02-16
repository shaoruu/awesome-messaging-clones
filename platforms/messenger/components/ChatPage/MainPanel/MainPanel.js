import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core'

import Messages from './Messages/Messages'

class MainPanel extends Component {
	render() {
		if (!this.props.channelId) return null
		return (
			<div className={this.props.className}>
				<Messages chatroomId={this.props.chatroomId} />
			</div>
		)
	}
}

const styles = theme => ({})

export default withApollo(withStyles(styles)(MainPanel))
