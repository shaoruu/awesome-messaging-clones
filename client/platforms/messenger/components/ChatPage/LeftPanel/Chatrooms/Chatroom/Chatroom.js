import Link from 'next/link'
import moment from 'moment'
import { withStyles, Avatar } from '@material-ui/core'

const Chatroom = props => {
	const { classes, username: meUsername, chatroomId } = props

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

	let profilePic = null

	let sentTime = null

	if (messages[0]) {
		const {
			node: {
				sender: {
					nickname,
					user: { username, image }
				},
				message,
				sentAt
			}
		} = messages[0]

		profilePic = image

		sentTime = sentAt

		const senderName = nickname || (username === meUsername ? 'You' : username)

		body = <h1 className={classes.latestMessage}>{`${senderName}: ${message}`}</h1>
	}

	if (sentTime) {
		sentTime = moment(sentTime).format('LT')
	}

	const isThisChatroom = uniqueIdentifier === chatroomId

	return (
		<li
			className={classes.chatroomWrapper}
			style={isThisChatroom ? { background: 'rgba(0, 0, 0, 0.05)' } : null}>
			<Link as={`/chat/${uniqueIdentifier}`} href={`/chat?id=${uniqueIdentifier}`}>
				<a>
					<Avatar alt="profile" src={profilePic} className={classes.avatar} />
					<div className={classes.infoWrapper}>
						<div className={classes.nameWrapper}>
							<h1 className={classes.chatroomName}>{chatroomName}</h1>
							{sentTime && (
								<h1 className={classes.lastMessageTimestamp}>
									{sentTime}
								</h1>
							)}
						</div>
						{body}
					</div>
				</a>
			</Link>
		</li>
	)
}

const styles = theme => ({
	chatroomWrapper: {
		padding: 5,
		cursor: 'pointer',
		justifySelf: 'stretch',
		'&:hover': {
			background: 'rgba(0, 0, 0, 0.05)'
		},
		'&:active': {
			background: 'rgba(0, 0, 0, 0.1) !important'
		},
		'& a': {
			textDecoration: 'none',
			color: 'rgba(0, 0, 0, 1)',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		}
	},
	infoWrapper: {
		flex: 1,
		minWidth: 0,
		marginLeft: 10,
		verticalAlign: 'middle'
	},
	chatroomName: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		fontSize: 16,
		fontWeight: 400,
		lineHeight: 1.4
	},
	latestMessage: {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		fontSize: 14,
		fontWeight: 400,
		color: 'rgba(0, 0, 0, 0.4)',
		height: 20
	},
	avatar: {
		margin: 3,
		width: 50,
		height: 50,
		border: '1px solid #F5F6F7'
	},
	nameWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	lastMessageTimestamp: {
		fontSize: 13,
		fontWeight: 400,
		marginRight: 5,
		color: 'rgba(0, 0, 0, 0.35)'
	}
})

export default withStyles(styles)(Chatroom)
