export default props => {
	const {
		message,
		sender: {
			nickname,
			user: { username }
		}
	} = props.data

	const senderName = nickname ? nickname : username

	return (
		<li>
			<p>{`${senderName}: ${message}`}</p>
		</li>
	)
}
