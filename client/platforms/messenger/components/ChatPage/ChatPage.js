import React, { Component } from 'react'

import MainPanel from './MainPanel/MainPanel'
import LeftPanel from './LeftPanel/LeftPanel'
import { withStyles } from '@material-ui/core'
import RightPanel from './RightPanel/RightPanel'
import TopPanel from './TopPanel/TopPanel'

class ChatPage extends Component {
	render() {
		if (process.browser) document.body.style.overflow = 'hidden'

		const { classes } = this.props

		const commonProps = {
			chatroomId: this.props.chatroomId,
			username: this.props.username
		}

		return (
			<div className={classes.root}>
				<LeftPanel className={classes.leftPanel} {...commonProps} />
				<TopPanel
					chatroomId={this.props.chatroomId}
					className={classes.topPanel}
				/>
				<MainPanel className={classes.mainPanel} {...commonProps} />
				<RightPanel
					chatroomId={this.props.chatroomId}
					className={classes.rightPanel}
				/>
			</div>
		)
	}
}

const styles = theme => ({
	root: {
		display: 'grid',
		height: '100%',
		gridTemplateColumns: 'repeat(20, 1fr)',
		gridTemplateRows: 'repeat(16, 1fr)'
	},
	mainPanel: {
		gridColumn: '6/16',
		gridRow: '2/17',
		position: 'relative',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'stetch'
	},
	topPanel: {
		gridColumn: '6/21',
		gridRow: '1/1',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottom: '1px solid #CCCCCC'
	},
	leftPanel: {
		gridColumn: '1/6',
		gridRow: '1/17',
		height: '100%',
		width: '100%',
		borderRight: '1px solid #CCCCCC',
		position: 'relative',
		display: 'grid',
		gridTemplateRows: 'repeat(16, 1fr)'
	},
	rightPanel: {
		gridColumn: '16/21',
		gridRow: '2/5'
	}
})

export default withStyles(styles)(ChatPage)
