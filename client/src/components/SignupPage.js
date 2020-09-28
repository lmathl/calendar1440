import PropTypes from 'prop-types';
import React from "react";
import Alert from "react-bootstrap/lib/Alert";

const propTypes = {
	toggleSignup: PropTypes.func.isRequired
}

class SignupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			msg: '',
			userId: '',
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	signup = (e) => {
		e.preventDefault();
		fetch("/api/auth/signup", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			})
		})
			.then(response => response.json())
			.then(data => {
				if (data.error === "Bad Request" && data.errors) {
					const errorMessage = "Error: " + data.errors.map(error => error.field + " " + error.defaultMessage).join(", ")
					this.setState({ msg: errorMessage })
				} else if (data.message.includes("Error")) {
					this.setState({ msg: data.message })
				} else {
					this.setState({ msg: data.message, userId: data.userId }, () => {
						const custom = {
							userId: this.state.userId
						}
						this.createCustom(custom);
					});
				}
			})
			.catch(err => console.log(err));
	}

	createCustom = (custom) => {
		fetch(`/api/customs?userId=${ this.state.userId }`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(custom)
		})
			.then(res => res.json())
			.then(custom => {
				console.log(custom);
			})
	}

	render() {

		return (
			<form onSubmit={ (e) => e.preventDefault() }>
				<div className="text-align-center header extra-large">Calendar</div>
				<input className="form-control input-lg" placeholder="Username" type="text" name="username" onChange={ this.handleChange } />
				<input className="form-control input-lg" placeholder="Email" type="text" name="email" onChange={ this.handleChange } />
				<input className="form-control input-lg" placeholder="Password" type="password" name="password" onChange={ this.handleChange } />
				<br />
				<button type="button" className="btn btn-secondary btn-block" onClick={ this.signup }>
					Sign Up
				</button>
				<br />
				{this.state.msg && <Alert className="cursor-pointer" onClick={ this.props.toggleSignup }>
					{ this.state.msg }
				</Alert> }
			</form>
		);
	}
}

SignupPage.propTypes = propTypes;
export default SignupPage;