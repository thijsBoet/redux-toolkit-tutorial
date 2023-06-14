const redux = require('redux')
const produce = require('immer').produce

const initialState = {
  firstName: 'Bill',
  lastName: 'Gates',
  age: 65,
  address: {
    street : "MICROSOFT WAY 1",
    city: "Redmond",
    state: "WA",
    zip: "98052",
    country: "USA"
  }
}

const STREET_UPDATED = 'STREET_UPDATED';
const AGE_UPDATED = 'AGE_UPDATED';

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
}

const updateAge = (age) => {
  return {
		type: AGE_UPDATED,
		payload: age,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, draft => {
        draft.address.street = action.payload;
      })
    case AGE_UPDATED:
      return produce(state, draft => {
        draft.age = action.payload;
      })
    default:
      return state;
  }
}

const store = redux.createStore(reducer);

console.log('Initial state: ', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Updated state: ', store.getState());
})

const actions = redux.bindActionCreators({ updateStreet, updateAge }, store.dispatch);

actions.updateStreet('Adriaen van der Doeslaan 40a');
actions.updateAge(67);

unsubscribe();
console.log(store.getState());

