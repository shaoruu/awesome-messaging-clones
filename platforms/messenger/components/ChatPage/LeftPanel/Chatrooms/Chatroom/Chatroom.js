export default props => {
	const {
		data: {
			chatroom: {
				name: chatroomName,
				messages: { edges: singleMessage }
			}
		}
	} = props

	const {
		node: {
			sender: {
				nickname,
				user: { username }
			},
			message
		}
	} = singleMessage[0]

	const senderName = nickname || username

	return (
		<div>
			<p>{`${chatroomName}: ${senderName}: ${message}`}</p>
		</div>
	)
}
