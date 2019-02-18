import { withStyles } from '@material-ui/core'

const Message = props => {
	const { classes, username: meUsername, specialStyle } = props

	const {
		message,
		sender: {
			nickname,
			user: { username }
		}
	} = props.data

	const senderName = nickname ? nickname : username

	const isMe = meUsername === username

	const specials = {}

	let cornerRadiuses = ['5px', '25px', '25px', '5px']
	if (specialStyle.includes('first')) {
		cornerRadiuses[3] = '25px'
		specials['marginTop'] = 10
	}
	if (specialStyle.includes('last')) {
		cornerRadiuses[0] = '25px'
		specials['marginBottom'] = 10
	}

	if (isMe) {
		let a = cornerRadiuses[0]
		cornerRadiuses[0] = cornerRadiuses[1]
		cornerRadiuses[1] = a

		let b = cornerRadiuses[2]
		cornerRadiuses[2] = cornerRadiuses[3]
		cornerRadiuses[3] = b
	}

	let fancyStyles = { borderRadius: cornerRadiuses.join(' ') }
	if (!isMe) {
		fancyStyles = Object.assign(
			{},
			fancyStyles,
			{
				background: '#EFEEEE',
				color: 'black',
				marginRight: 0,
				marginLeft: 10
			},
			specials
		)
	}

	return (
		<li
			className={classes.messageRoot}
			style={isMe ? { alignSelf: 'flex-end' } : null}>
			<h1 className={classes.messageBody} style={fancyStyles}>
				{isMe ? `${message}` : `${senderName}: ${message}`}
			</h1>
		</li>
	)
}

const styles = theme => ({
	messageRoot: { display: 'inline-block' },
	messageBody: {
		background: '#0084ff',
		display: 'inline-block',
		fontSize: 14,
		fontWeight: 400,
		color: '#eeeeee',
		padding: 8,
		margin: '2px 10px 0 0'
	}
})

export default withStyles(styles)(Message)
