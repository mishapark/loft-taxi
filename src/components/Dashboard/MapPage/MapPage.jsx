import React from 'react';
import Header from '../Header';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Logo } from '../../shared/Logo';
import LoginForm from '../../LoginPage/LoginForm';
import { actions } from '../../../store/auth/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let { logIn, logInSuccess, logInFailure } = actions;

const MapPage = (props) => {
	let { map, email, password, isLoggedIn, logIn, logInSuccess, logInFailure } = props;

	const myMapRef = useRef();

	useEffect(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoidGVyYXRyb24iLCJhIjoiY2s4c3dyOGZ4MDNoMjNlbGtvYzJ3NzBsciJ9.h0f9Px2X_1Go39lBV5kq7Q';
		let map = new mapboxgl.Map({
			container: myMapRef.current || '',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [30.2656504, 59.8029126],
			zoom: 15,
		});
	});

	return <div className="map-page" ref={myMapRef}></div>;
};

MapPage.propTypes = {
	getPage: PropTypes.func,
};

export const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		isLoggedIn: state.auth.isLoggedIn,
		map: '',
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		logIn: bindActionCreators(logIn, dispatch),
		logInSuccess: bindActionCreators(logInSuccess, dispatch),
		logInFailure: bindActionCreators(logInFailure, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
