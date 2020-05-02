import { actions } from './actions';
let temp;
let { card, cardSuccess, cardFailure, cardSuccessUpdate, cardFailureUpdate, checkIsCard, cardResetAll, cardErrorReset } = actions;

const sData = JSON.parse(localStorage.getItem('loft-taxi-state')) || {};

console.log('1', sData)

const initialState = {
	cardName: '',
	cardNumber: '',
	cardExpiry: '',
	cardCvv: '',
	isCard: false,
	isCardLoaded: false,
	error: ''
};

export const profileReducer = (state = initialState, action) => {
	console.log('2', sData)
	console.log('весь стейт', state)

	switch (action.type) {
		case card.toString():
			return {
				...state,
				cardName: action.payload.cardName,
				cardNumber: action.payload.cardNumber,
				cardExpiry: action.payload.cardExpiry,
				cardCvv: action.payload.cardCvv,
				error: ''
			};

		case checkIsCard.toString():
			if (sData.profile.isCard) {
				return {
					...state,
					isCard: true,
				};
			}
			return state;

		case cardSuccess.toString():
			temp = JSON.parse(localStorage.getItem('loft-taxi-state'));
			console.log('temp!', temp)
			console.log('state!', state)
			localStorage.setItem('loft-taxi-state', JSON.stringify({
				...temp, profile: {
					isCard: true,
					cardName: action.payload.cardName,
					cardNumber: action.payload.cardNumber,
					cardExpiry: action.payload.expiryDate,
					cardCvv: action.payload.cvc,
					error: '',
					isCardLoaded: true
				}
			}));

			return {
				...state,
				isCard: true,
				cardName: action.payload.cardName,
				cardNumber: action.payload.cardNumber,
				cardExpiry: action.payload.expiryDate,
				cardCvv: action.payload.cvc,
				error: '',
				isCardLoaded: true
			};

		case cardSuccessUpdate.toString():
			temp = JSON.parse(localStorage.getItem('loft-taxi-state'));
			console.log('temp!', temp)
			console.log('state!', state)
			localStorage.setItem('loft-taxi-state', JSON.stringify({
				...temp, profile: {
					cardName: action.payload.cardName,
					cardNumber: action.payload.cardNumber,
					cardExpiry: action.payload.expiryDate,
					cardCvv: action.payload.cvc,
					error: '',
					isCard: true,
					isCardLoaded: true
				}
			}));

			return {
				...state,
				cardName: action.payload.cardName,
				cardNumber: action.payload.cardNumber,
				cardExpiry: action.payload.expiryDate,
				cardCvv: action.payload.cvc,
				error: '',
				isCard: true,
				isCardLoaded: true
			};

		case cardFailure.toString():
			return {
				...state, error: action.payload,
				isCardLoaded: true
			};

		case cardFailureUpdate.toString():
			return {
				...state, error: action.payload,
				isCardLoaded: true
			};

		case cardResetAll.toString():
			return {
				cardName: '',
				cardNumber: '',
				cardExpiry: '',
				cardCvv: '',
				isCard: false,
				isCardLoaded: false,
				error: ''
			}

		case cardErrorReset.toString():
			return { ...state, error: '' };

		default:
			return state;
	}
};