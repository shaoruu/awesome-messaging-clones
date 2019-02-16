import Link from 'next/link'

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
			<li>
				<Link
					as={`/chat/${uniqueIdentifier}`}
					href={`/chat?id=${uniqueIdentifier}`}>
					<p style={{ margin: '5px 0' }}>{`${chatroomName}:`}</p>
				</Link>
			</li>
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
		<li>
			<Link as={`/chat/${uniqueIdentifier}`} href={`/chat?id=${uniqueIdentifier}`}>
				<p
					style={{
						margin: '5px 0'
					}}>{`${chatroomName}: ${senderName}: ${message}`}</p>
			</Link>
		</li>
	)
}
