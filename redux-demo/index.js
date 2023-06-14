const redux = require('redux');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

// DO NOT CALL createStore AS A FUNCTION () results in an error
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED';
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED';

// ACTIONS
// "order one cake"
function orderCake(qty = 1) {
    return {
		type: CAKE_ORDERED,
		payload: qty,
	};
}

function restockCake(qty = 1) {
    return {
		type: CAKE_RESTOCKED,
		payload: qty,
	};
}

function orderIceCream(qty = 1) {
    return {
		type: ICE_CREAM_ORDERED,
		payload: qty,
	};
}

function restockIceCream(qty = 1) {
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty,
    };
}

// INITIAL STATE
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// };

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

// REDUCER
// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				...state,
				numOfCakes: state.numOfCakes - action.payload,
			};
		case CAKE_RESTOCKED:
			return {
				...state,
				numOfCakes: state.numOfCakes + action.payload,
			};
		default:
			return state;
	}
};

const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload,
            }
        case ICE_CREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state;
    }
};

// combine both Reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: IceCreamReducer
})

// STORE
// Holds application state
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state: ', store.getState());

// SUBSCRIBE
// Called when state changes
const unsubscribe = store.subscribe(() => {});

// DISPATCH
// Dispatches an action
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

// ACTION CREATORS - short hand for dispatching actions
const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(3);

// UNSUBSCRIBE
// Unsubscribe from store state changes
unsubscribe();

// UNSUBSCRIBED therefore no state changes
store.dispatch(orderCake());