import { Component } from 'react'
import { Query } from 'react-apollo'
import { CHATROOM_QUERY } from '../../../lib/graphql'
import { withStyles } from '@material-ui/core'

class TopPanel extends Component {
	render() {
		const { classes, chatroomId, className } = this.props
		return (
			<Query
				query={CHATROOM_QUERY}
				variables={{ uniqueIdentifier: chatroomId }}
				onError={error => console.log(error)}>
				{({ loading, data, error }) => {
					if (loading || error) return null
					return (
						<div className={className}>
							<h1 className={classes.chatroomName}>{data.chatroom.name}</h1>
						</div>
					)
				}}
			</Query>
		)
	}
}

const styles = theme => ({
	chatroomName: {
		display: 'inline',
		fontSize: 16,
		fontWeight: 500
	}
})

export default withStyles(styles)(TopPanel)
