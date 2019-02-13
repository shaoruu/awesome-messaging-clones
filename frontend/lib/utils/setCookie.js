import cookie from 'cookie'

export default token => {
	// store the token in cookie
	document.cookie = cookie.serialize('token', token, {
		maxAge: 5 * 7 * 24 * 60 * 60 // 5 weeks
	})
}
