import { withStyles, Avatar } from '@material-ui/core'

const Message = props => {
	const { classes, isMe, specialStyles } = props

	const { message, sentAt } = props.data

	const specials = {}

	let cornerRadiuses = ['5px', '20px', '20px', '5px']
	if (specialStyles.includes('first')) {
		cornerRadiuses[3] = '20px'
		specials['marginBottom'] = 7
	}
	if (specialStyles.includes('last')) {
		cornerRadiuses[0] = '20px'
		specials['marginTop'] = 5
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
				marginLeft: 5
			},
			specials
		)
	}

	return (
		<div className={classes.messageRoot}>
			<p className={classes.messageBody} style={fancyStyles}>
				{message.split('\n').map((ele, index) => (
					<span key={index}>
						{ele}
						<br />
					</span>
				))}
			</p>
		</div>
	)
}

const styles = theme => ({
	messageRoot: { display: 'inline-block', height: '100%', maxWidth: 400 },
	messageBody: {
		background: '#0084ff',
		fontSize: 14,
		fontWeight: 400,
		overflowWrap: 'break-word',

		color: '#eeeeee',
		padding: '8px 12px',
		margin: '2px 10px 0 0'
	}
})

export default withStyles(styles)(Message)
