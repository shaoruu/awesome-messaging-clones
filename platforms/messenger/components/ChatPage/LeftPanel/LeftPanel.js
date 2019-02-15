import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core'

import Chatrooms from './Chatrooms/Chatrooms'

class MainPanel extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<Chatrooms />
			</div>
		)
	}
}

const styles = theme => ({})

export default withApollo(withStyles(styles)(MainPanel))
