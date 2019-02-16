import React, { Component } from 'react'

import MainPanel from './MainPanel/MainPanel'
import LeftPanel from './LeftPanel/LeftPanel'
import { withStyles } from '@material-ui/core'

class ChatPage extends Component {
	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<LeftPanel className={classes.leftPanel} username={this.props.username} />
				<MainPanel
					chatroomId={this.props.chatroomId}
					className={classes.mainPanel}
				/>
			</div>
		)
	}
}

const styles = theme => ({
	root: {
		display: 'grid',
		gridTemplateColumns: 'repeat(20, 1fr)'
	},
	mainPanel: {
		gridColumn: '6/16'
	},
	leftPanel: {
		gridColumn: '1/6',
		border: '1px solid black',
		display: 'flex',
		flexDirection: 'column'
	}
})

export default withStyles(styles)(ChatPage)
