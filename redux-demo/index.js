const redux = require('redux');
const createStore = redux.createStore;

const CAKE_ORDERED = 'CAKE_ORDERED';

// ACTION
// "order one cake"
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

// INITIAL STATE
const initialState = {
	numOfCakes: 10,
};

// REDUCER
// (previousState, action) => newState
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.quantity
            }
        default:
            return state;
    }
};

// STORE
// Holds application state
const store = createStore(reducer);
console.log('Initial state: ', store.getState());

// SUBSCRIBE
// Called when state changes
const unsubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()));

// DISPATCH
// Dispatches an action
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// UNSUBSCRIBE
// Unsubscribe from store state changes
unsubscribe();

// UNSUBSCRIBED therefore no state changes
store.dispatch(orderCake());