import { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Mutation } from 'react-apollo'

import { UPDATE_CHATROOM_MUTATION } from '../../../../lib/graphql'

class ChatroomBasicInfo extends Component {
	render() {
		const { classes, chatroomId, chatroomName } = this.props
		return (
			<Mutation
				mutation={UPDATE_CHATROOM_MUTATION}
				onError={error => console.log(error)}>
				{(updateChatroom, { loading, data }) => {
					return (
						<div className={classes.root}>
							<button className={classes.button}>
								<h1 className={classes.buttonName}>{chatroomName}</h1>
							</button>
						</div>
					)
				}}
			</Mutation>
		)
	}
}

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-around'
	},
	button: {
		border: 'none',
		background: 'transparent',
		height: 60,
		flex: 1,
		margin: 5
	},
	buttonName: {
		textAlign: 'left',
		fontSize: 18,
		fontWeight: 500,
		marginLeft: 10
	}
})

export default withStyles(styles)(ChatroomBasicInfo)
