import React, { Component } from 'react'
import { Mutation, withApollo } from 'react-apollo'
import { Formik } from 'formik'
import {
	FormControl,
	FormHelperText,
	withStyles,
	Checkbox,
	FormControlLabel
} from '@material-ui/core'

import { redirect, setCookie } from '../../../lib/utils'
import { LOGIN_MUTATION, LOGIN_SCHEMA } from '../../../lib/graphql'
import Logo from '../../Logo/Logo'

class LoginForm extends Component {
	state = {
		keepMeLoggedIn: true
	}

	handleChecked = () => {
		this.setState(prevState => {
			prevState.keepMeLoggedIn = !prevState.keepMeLoggedIn
			return prevState
		})
	}

	render() {
		const { classes, client } = this.props

		return (
			<div className={classes.root}>
				<Mutation
					mutation={LOGIN_MUTATION}
					onCompleted={data => {
						// TODO: Figure out how to sign user out on tab close
						if (!this.state.keepMeLoggedIn)
							sessionStorage.setItem('keepMeLoggedIn', 'yes')

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
							initialValues={{ username: '', password: '', checked: false }}
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
								<>
									<form
										onSubmit={handleSubmit}
										className={classes.form}>
										<Logo className={classes.logo} />
										<h1 className={classes.title}>
											Awesome Messenger
										</h1>
										<h2 className={classes.description}>
											Instantly connect with people in your life.
										</h2>
										<h2 className={classes.description}>
											Sign in to get started.
										</h2>
										<div className={classes.inputFieldContainer}>
											<FormControl aria-describedby="error-text">
												<input
													required
													id="username"
													name="username"
													value={values.username}
													label="Username"
													onChange={handleChange}
													onBlur={handleBlur}
													placeholder="Username"
													margin="normal"
													className={classes.textField}
													variant="outlined"
												/>
												{(touched.username &&
													errors &&
													errors.username && (
														<FormHelperText
															id="error-text"
															error
															className={
																classes.errorMessage
															}>
															{errors.username}
														</FormHelperText>
													)) ||
													(error &&
														error.message.includes(
															'credentials'
														) && (
															<FormHelperText
																id="error-text"
																error
																className={
																	classes.errorMessage
																}>
																Invalid username or
																password.
															</FormHelperText>
														))}
											</FormControl>
											<FormControl aria-describedby="error-text">
												<input
													// required
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
														<FormHelperText
															id="error-text"
															error
															className={
																classes.errorMessage
															}>
															{errors.password}
														</FormHelperText>
													)}
											</FormControl>
										</div>
										<div className={classes.buttonWrapper}>
											<button
												type="submit"
												disabled={
													!values.username ||
													!values.password ||
													isSubmitting ||
													!!(
														errors.username &&
														touched.username
													) ||
													!!(
														errors.password &&
														touched.password
													)
												}
												className={classes.continueButton}>
												Continue
											</button>
										</div>
									</form>
									<div className={classes.keepMeLoggedInWrapper}>
										<FormControlLabel
											control={
												<Checkbox
													checked={this.state.keepMeLoggedIn}
													onChange={this.handleChecked}
													disableRipple
													color="primary"
												/>
											}
											label={<h1>Keep me signed in</h1>}
										/>
									</div>{' '}
								</>
							)}
						/>
					)}
				</Mutation>
			</div>
		)
	}
}

const styles = theme => ({
	root: {
		height: '100%'
	},
	form: {
		display: 'flex',
		width: 600,
		height: '90%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 'auto'
	},
	logo: {
		height: 160,
		minWidth: '100%',
		display: 'flex',
		justifyContent: 'center',
		'&>img': {
			maxWidth: 110,
			maxHeight: 110
		}
	},
	title: {
		color: 'rgba(0, 0, 0, 1)',
		fontSize: 60,
		fontWeight: '300',
		marginBottom: 24,
		textAlign: 'center'
	},
	description: {
		color: 'rgba(0, 0, 0, 1)',
		fontSize: 24,
		fontWeight: '200',
		lineHeight: '1.2',
		marginBottom: 24,
		textAlign: 'center'
	},
	inputFieldContainer: {
		display: 'flex',
		width: 450,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'centerz',
		position: 'relative'
	},
	textField: {
		width: 450,
		height: 60,
		padding: 25,
		fontSize: 24,
		border: 'rgba(0, 0, 0, 0.2) 1.5px solid',
		borderRadius: 5,
		margin: 'auto',
		marginTop: 10,
		'&:last-child': {
			marginBottom: 20
		},
		'&::placeholder': {
			fontWeight: 300,
			color: 'rgba(0, 0, 0, 0.4)'
		}
	},
	errorMessage: {
		marginLeft: 25
	},
	buttonWrapper: {
		position: 'relative'
	},
	continueButton: {
		background: 'transparent',
		border: 'none',
		cursor: 'pointer',
		fontSize: 32,
		width: '100%',
		height: 40,
		marginTop: 24,
		color: '#0084ff',
		borderRadius: 15,
		transition: 'all .1s',
		'&:active': {
			fontSize: 31,
			outline: 'none'
		},
		'&:disabled': {
			color: '#8B8B8B'
		}
	},
	keepMeLoggedInWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
		'& h1': {
			fontSize: 24,
			fontWeight: 350,
			color: 'rgba(0, 0, 0, 0.3)'
		}
	}
})

export default withApollo(withStyles(styles)(LoginForm))
