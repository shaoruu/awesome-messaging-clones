import Member from './Member/Member'

export default props => {
	const { edges: memberList } = props.data

	memberList.sort((a, b) => (a.node.user.username > b.node.user.username ? 1 : -1))

	return (
		<div>
			<h5>people:</h5>
			{memberList.map((ele, index) => {
				return <Member key={index} data={ele.node} />
			})}
		</div>
	)
}
