import React, { Component } from 'react'
import { Mutation, withApollo } from 'react-apollo'
import { Formik } from 'formik'
import {
	TextField,
	FormControl,
	FormHelperText,
	Button,
	withStyles
} from '@material-ui/core'

import { redirect, setCookie } from '../../lib/utils'
import { LOGIN_MUTATION, LOGIN_SCHEMA } from '../../lib/graphql'
import { Logo } from '..'

class LoginBox extends Component {
	render() {
		const { classes, client } = this.props

		return (
			<div className={classes.root}>
				<Mutation
					mutation={LOGIN_MUTATION}
					onCompleted={data => {
						setCookie(data.login.token)

						// Force a reload of all current queries now that user is
						// logged in
						client.cache.reset().then(() => {
							redirect({}, '/chat')
						})
					}}
					onError={error => console.log(error)}>
					{(login, { error, data }) => (
						<Formik
							initialValues={{ username: '', password: '' }}
							validationSchema={LOGIN_SCHEMA}
							onSubmit={(values, { setSubmitting }) => {
								login({
									variables: {
										/* TODO: change this to email */
										username: values.username.toLowerCase(),
										password: values.password
									}
								})
								setSubmitting(false)
							}}
							render={({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting
							}) => (
								<form onSubmit={handleSubmit} className={classes.form}>
									<Logo className={classes.logo} />
									<div className={classes.title}>Awesome Messenger</div>
									<div className={classes.description}>
										Sign in with your account to get started.
									</div>
									<div className={classes.inputFieldContainer}>
										<FormControl aria-describedby="error-text">
											<TextField
												required
												id="username"
												name="username"
												value={values.username}
												label="Username"
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="Username"
												className={classes.textField}
												variant="outlined"
											/>
											{(touched.username &&
												errors &&
												errors.username && (
													<FormHelperText id="error-text" error>
														{errors.username}
													</FormHelperText>
												)) ||
												(error &&
													error.message.includes(
														'credentials'
													) && (
														<FormHelperText
															id="error-text"
															error>
															Invalid username or password.
														</FormHelperText>
													))}
										</FormControl>
										<FormControl aria-describedby="error-text">
											<TextField
												required
												id="password"
												name="password"
												value={values.password}
												type="password"
												autoComplete="current-password"
												label="Password"
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="Password"
												className={classes.textField}
												variant="outlined"
											/>
											{touched.password &&
												errors &&
												errors.password && (
													<FormHelperText id="error-text" error>
														{errors.password}
													</FormHelperText>
												)}
										</FormControl>
									</div>
									<div className={classes.buttonWrapper}>
										<Button
											type="submit"
											variant="text"
											disabled={
												isSubmitting ||
												!!(errors.username && touched.username) ||
												!!(errors.password && touched.password)
											}>
											Continue
										</Button>
									</div>
								</form>
							)}
						/>
					)}
				</Mutation>
			</div>
		)
	}
}

const styles = theme => ({
	root: {},
	form: {},
	logo: {
		'&>img': {
			maxWidth: '2em',
			maxHeight: '2em'
		}
	},
	title: {},
	description: {},
	inputFieldContainer: {},
	textField: {},
	buttonWrapper: {}
})

export default withApollo(withStyles(styles)(LoginBox))
