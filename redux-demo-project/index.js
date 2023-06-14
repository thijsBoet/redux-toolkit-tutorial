const redux = require('redux');
// DO NOT CALL createStore AS A FUNCTION () results in an error
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const PIZZA_ORDERED = 'PIZZA_ORDERED';
const PIZZA_RESTOCKED = 'PIZZA_RESTOCKED';

const BEER_ORDERED = 'SODA_ORDERED';
const BEER_RESTOCKED = 'SODA_RESTOCKED';

function orderPizza(qty = 1) {
	return {
		type: PIZZA_ORDERED,
		payload: qty,
	};
}

function restockPizza(qty = 1) {
	return {
		type: PIZZA_RESTOCKED,
		payload: qty,
	};
}

function orderBeer(qty = 1) {
	return {
		type: BEER_ORDERED,
		payload: qty,
	};
}

function restockBeer(qty = 1) {
	return {
		type: BEER_RESTOCKED,
		payload: qty,
	};
}

const initialPizzaState = {
	numOfPizzas: 10,
};

const initialBeerState = {
  numOfBeers: 100,
}
const pizzaReducer = (state = initialPizzaState, action) => {
	switch (action.type) {
		case PIZZA_ORDERED:
			return {
				...state,
				numOfPizzas: state.numOfPizzas - action.payload,
			};
		case PIZZA_RESTOCKED:
			return {
				...state,
				numOfPizzas: state.numOfPizzas + action.payload,
			};
		default:
			return state;
	}
};

const beerReducer = (state = initialBeerState, action) => {
	switch (action.type) {
		case BEER_ORDERED:
			return {
				...state,
				numOfPizzas: state.numOfPizzas - action.payload,
			};
		case BEER_RESTOCKED:
			return {
				...state,
				numOfPizzas: state.numOfPizzas + action.payload,
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
  pizza: pizzaReducer,
  beer: beerReducer,
})
const store = createStore(rootReducer);
// console.log('Initial state: ', store.getState());

// store.dispatch(orderPizza(1));
// store.dispatch(orderPizza(2));
// store.dispatch(orderPizza(2));
// console.log('5 Pizzas Ordered: ', store.getState());

// store.dispatch(restockPizza(10));
// console.log('10 Pizzas Restocked: ', store.getState());
const actions = bindActionCreators(
	{ orderPizza, restockPizza, orderBeer, restockBeer },
	store.dispatch,
);

actions.orderPizza(1);
actions.orderPizza(2);
actions.orderPizza(2);
console.table(store.getState());

actions.restockPizza(10);
console.log(store.getState());

actions.orderBeer(15);
actions.orderBeer(10);
actions.orderBeer(15);
actions.orderBeer(50);
console.table(store.getState());

actions.restockBeer(100);

store.subscribe(() => console.table(store.getState()));
