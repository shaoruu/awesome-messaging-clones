import { Component } from 'react'

import CreateChatroom from './CreateChatroom/CreateChatroom'
import { withStyles } from '@material-ui/core'

class LeftPanelNavBar extends Component {
	render() {
		const { classes } = this.props
		return (
			<div className={classes.panelNavBarWrapper}>
				<CreateChatroom />
			</div>
		)
	}
}

const styles = theme => ({
	panelNavBarWrapper: {
		gridRow: '1/2'
	}
})

export default withStyles(styles)(LeftPanelNavBar)
