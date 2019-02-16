export default props => {
	const {
		data: {
			chatroom: {
				uniqueIdentifier,
				name: chatroomName,
				messages: { edges: messages }
			}
		}
	} = props

	if (!messages[0]) {
		return (
			<div>
				<p>{`${uniqueIdentifier}|${chatroomName}:`}</p>
			</div>
		)
	}

	const {
		node: {
			sender: {
				nickname,
				user: { username }
			},
			message
		}
	} = messages[0]

	const senderName = nickname || username

	return (
		<div>
			<p>{`${uniqueIdentifier}|${chatroomName}: ${senderName}: ${message}`}</p>
		</div>
	)
}
