const Redux = require('redux');
const produce = require('immer').produce;
const initialState = {
  name: 'Matthijs',
  address: {
    street: 'Adriaen van der Doeslaan 40c',
    city: 'Rotterdam',
    zip: '3054EE',
  },
}

const STREET_UPDATED = 'STREET_UPDATED';
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // };
      return produce(state, draft => {
        draft.address.street = action.payload;
      })
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);
console.log('Initial state: ', store.getState());
const unsubscribe = store.subscribe(() => {
  console.log('Updated state: ', store.getState());
})
store.dispatch(updateStreet('Adriaen van der Doeslaan 40a'));
unsubscribe();