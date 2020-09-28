import React from "react";
import Alert from "react-bootstrap/lib/Alert";
import SignupPage from "./SignupPage";

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			msg: '',
			token: '',
			showSignup: false,
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	signin = (e) => {
		e.preventDefault();
		fetch('/api/auth/signin', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		})
			.then(response => response.json())
			.then(data => {
				localStorage.setItem('app', JSON.stringify({ token: data.accessToken, userId: data.id }));
				this.setState({ token: data.accessToken, msg: data.message })
				if (!data.error) {
					window.location.reload();
				}
			})
			.catch(error => {
				this.setState({ msg: 'Error logging in.' });
				console.error('Error during authentication', error);
			})
	}

	toggleSignup = () => {
		this.setState({ showSignup: !this.state.showSignup });
	}

	render() {

		return (
			<div className="wrapper">
				<div className="auth">
					{ this.state.showSignup ? <SignupPage toggleSignup={ this.toggleSignup } /> : <form onSubmit={ (e) => e.preventDefault() }>
						<div className="text-align-center header extra-large">Calendar</div>
						<input className="form-control input-lg" placeholder="Username" type="text" name="username" onChange={ this.handleChange } />
						<input className="form-control input-lg" placeholder="Password" type="password" name="password" onChange={ this.handleChange } />
						<br />
						<button className="btn btn-secondary btn-block" onClick={ this.signin }>
							Login
					</button>
						<br />
					First time user? <button className="btn" onClick={ this.toggleSignup }>Sign up here.</button>
						<br />
						<br />
						{ this.state.msg && <Alert>{ this.state.msg }</Alert> }
					</form> }
				</div>
			</div>
		);
	}
}

export default LoginPage;