import { withStyles, Avatar } from '@material-ui/core'
import Message from './Message/Message'

const MessageList = props => {
	const { data: messages, classes, username } = props

	let messageBlocks = []
	messages.forEach((ele, index) => {
		const { username: senderName } = ele.node.sender.user

		const isMe = username === senderName

		if (
			index === 0 ||
			(index !== 0 && senderName !== messages[index - 1].node.sender.user.username)
		)
			messageBlocks.push({ data: [], isMe })
		messageBlocks[messageBlocks.length - 1].data.push(ele.node)
	})

	return (
		<>
			{messageBlocks.map(({ data, isMe }, index) => {
				const {
					nickname,
					sender: {
						user: { username, image: profilePicture }
					}
				} = data[0]

				const messageBlock = (
					<div
						className={classes.singleMessageBlock}
						style={
							isMe
								? { alignSelf: 'flex-end', alignItems: 'flex-end' }
								: null
						}>
						{data.map((node, index) => {
							const specialStyles = [
								index === 0 ? 'first' : null,
								index === data.length - 1 ? 'last' : null
							]
							return (
								<Message
									specialStyles={specialStyles}
									data={node}
									isMe={isMe}
									key={index}
								/>
							)
						})}
					</div>
				)

				const senderName = nickname ? nickname : username

				return (
					<div
						className={classes.wholeBlockWrapper}
						key={index}
						style={
							isMe
								? { alignSelf: 'flex-end', alignItems: 'flex-end' }
								: null
						}>
						{!isMe && (
							<div className={classes.avatarWrapper}>
								<Avatar className={classes.avatar} src={profilePicture} />
							</div>
						)}
						<div className={classes.messageBlockWrapper}>
							{!isMe && (
								<h1 className={classes.senderName}>{senderName}</h1>
							)}
							{messageBlock}
						</div>
					</div>
				)
			})}
		</>
	)
}

const styles = theme => ({
	wholeBlockWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		flexShrink: 0,
		paddingBottom: 10
	},
	avatarWrapper: {
		margin: '0 0 7px 5px'
	},
	singleMessageBlock: {
		listStyle: 'none',
		display: 'flex',
		flexShrink: 0,
		flexDirection: 'column-reverse',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	avatar: {
		width: 33,
		height: 33,
		border: '1px solid rgba(0, 0, 0, 0.2)'
	},
	senderName: {
		fontSize: 12,
		fontWeight: 400,
		color: 'rgba(0,0,0,0.5)',
		marginLeft: 15
	}
})

export default withStyles(styles)(MessageList)
