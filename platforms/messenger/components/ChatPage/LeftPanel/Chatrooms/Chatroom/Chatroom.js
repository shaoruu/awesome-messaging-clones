import Link from 'next/link'
import { withStyles } from '@material-ui/core'

const Chatroom = props => {
	const { classes, username: meUsername } = props

	const {
		data: {
			chatroom: {
				uniqueIdentifier,
				name: chatroomName,
				messages: { edges: messages }
			}
		}
	} = props

	let body = <h3 className={classes.latestMessage} />

	if (messages[0]) {
		const {
			node: {
				sender: {
					nickname,
					user: { username }
				},
				message
			}
		} = messages[0]

		const senderName = nickname || (username === meUsername ? 'You' : username)

		body = <h3 className={classes.latestMessage}>{`${senderName}: ${message}`}</h3>
	}

	return (
		<li className={classes.chatroomWrapper}>
			<Link as={`/chat/${uniqueIdentifier}`} href={`/chat?id=${uniqueIdentifier}`}>
				<a>
					<h1 className={classes.chatroomName}>{chatroomName}</h1>
					{body}
				</a>
			</Link>
		</li>
	)
}

const styles = theme => ({
	chatroomWrapper: {
		padding: 5,
		cursor: 'pointer',
		'&:hover': {
			background: 'rgba(0, 0, 0, 0.2)'
		},
		'& a': {
			textDecoration: 'none',
			color: 'rgba(0, 0, 0, 1)'
		}
	},
	chatroomName: {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		fontSize: 18,
		fontWeight: 400,
		lineHeight: 1.4
	},
	latestMessage: {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		fontSize: 14,
		fontWeight: 300,
		height: 20
	}
})

export default withStyles(styles)(Chatroom)
