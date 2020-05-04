import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { actions } from '../../../store/auth/actions';
import styles from './LoginForm.module.css';
import { Preloader } from '../../shared/Preloader';
import { getIsLoggedIn, getError, getIsLogging } from '../../../store/auth/selectors'
import { Field, reduxForm } from 'redux-form'

const st = classNames.bind(styles);

let { logIn, logInErrorReset } = actions;

const emailCheck = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Введите корректный email'
		: undefined

const passwordCheck = value =>
value && value.length < 6
		? 'Введите пароль не менее 6 символов'
		: undefined

const customField = ({ input, type, placeholder, id, className, meta: { touched, error }, ...rest }) => {
	return (<><Input {...input} placeholder={placeholder} type={type} id={id} className={className} />
		<span className={st('validateError')}>{touched && error}</span>

	</>)
}

const LoginForm = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let { isLoggedIn, logIn, logInErrorReset, isLogging, serverError } = props;
	let { valid } = props;

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		logIn({ email, password });
	};

	useEffect(() => {
		return () => { logInErrorReset() }
	}, [])

	if (isLoggedIn) {
		return <Redirect to="/dashboard/map" />;
	}

	console.log(props)

	return (
		<div className={st('login-page__loginForm')}>
			<div className={st('login-page__loginForm-item')} style={{ height: '400px' }}>
				<div className={st('header-form')}>Вход</div>
				<div className={st('header-form__add')}>
					Новый пользователь?
					<Link to="/reg">
						<span>Зарегистрироваться</span>
					</Link>
				</div>
				<form onSubmit={submitHandler}>
					<label htmlFor="email">Адрес эл. почты*:</label>
					<Field
						type="text"
						id="email"
						name="email"
						className={st('input')}
						value={email}
						onChange={changeEmailHandler}
						required
						autoComplete="off"
						autoFocus
						component={customField}
						validate={emailCheck}

					/>
					<label htmlFor="password">
						Пароль*:
					</label>
					<Field
						type="password"
						id="password"
						name="password"
						className={st('input')}
						value={password}
						onChange={changePasswordHandler}
						required
						autoComplete="off"
						autoFocus
						component={customField}
						validate={passwordCheck}
					/>
					<span className={st('error')}>{serverError}</span>
					{isLogging ? <Preloader />
						: (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={st('button')}
								style={{ width: '100px' }}
								disabled={!email || !password || !valid}
							>
								Войти
							</Button>
						)}
				</form>
			</div>
		</div>
	);
};

LoginForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	serverError: PropTypes.string,
	isLogging: PropTypes.bool,
};

export const mapStateToProps = (state) => {
	return {
		isLoggedIn: getIsLoggedIn(state),
		serverError: getError(state),
		isLogging: getIsLogging(state),
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		logIn: bindActionCreators(logIn, dispatch),
		logInErrorReset: bindActionCreators(logInErrorReset, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'LoginForm'
})(LoginForm));
