import React from 'react';

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
	state = { isLoggedIn: false };

	login = (email, password) => {
		this.setState({ isLoggedIn: true }, () => {
			console.log(`isLoggedIn: ${this.state.isLoggedIn}, email: ${email}, password: ${password}`);
		});
	};

	logout = () => {
		this.setState({ isLoggedIn: false }, () => {
			console.log(`isLoggedIn: ${this.state.isLoggedIn}`);
		});
	};

	render() {
		return (
			<AuthContext.Provider
				value={{ isLoggedIn: this.state.isLoggedIn, login: this.login, logout: this.logout }}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
