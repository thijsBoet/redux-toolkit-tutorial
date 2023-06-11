const redux = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
	loading: false,
	users: [],
	error: '',
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

// ACTION CREATORS
const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUESTED,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCEEDED,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILED,
		payload: error,
	};
};

// REDUCER
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUESTED:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCEEDED:
			return {
				...state,
				loading: false,
				users: action.payload,
				error: '',
			};
		case FETCH_USERS_FAILED:
			return {
				...state,
				loading: false,
				users: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

// STORE
const store = createStore(reducer, applyMiddleware(thunk));

// ASYNC ACTION CREATOR
const fetchUsers = () => {
	return function (dispatch) {
		dispatch(fetchUsersRequest());
		axios
			.get(`${BASE_URL}/users`)
			.then(({ data }) => {
				const users = data;
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				dispatch(fetchUsersFailure(error.message));
			});
	};
};

// SUBSCRIBE
store.subscribe(() => console.log(store.getState()));

// DISPATCH
store.dispatch(fetchUsers());