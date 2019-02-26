export default props => {
	const {
		nickname,
		user: { username }
	} = props.data

	const userTag = nickname ? nickname : username

	return <div>{userTag}</div>
}
