const redux = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');
BASE_URL = 'https://catfact.ninja';

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  catFacts: [],
  error: '',
};

const FETCH_CAT_FACTS_REQUESTED = 'FETCH_CAT_FACTS_REQUESTED';
const FETCH_CAT_FACTS_SUCCEEDED = 'FETCH_CAT_FACTS_SUCCEEDED';
const FETCH_CAT_FACTS_FAILED = 'FETCH_CAT_FACTS_FAILED';

// ACTION CREATORS
const fetchCatFactsRequest = () => {
  return {
    type: FETCH_CAT_FACTS_REQUESTED,
  };
}

const fetchCatFactsSuccess = (catFacts) => {
  return {
    type: FETCH_CAT_FACTS_SUCCEEDED,
    payload: catFacts,
  };
}

const fetchCatFactsFailure = (error) => {
  return {
    type: FETCH_CAT_FACTS_FAILED,
    payload: error,
  };
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAT_FACTS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CAT_FACTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        catFacts: action.payload,
        error: '',
      };
    case FETCH_CAT_FACTS_FAILED:
      return {
        ...state,
        loading: false,
        catFacts: [],
        error: action.payload,
      };
    default:
      return state;
  }
}

// ASYNC ACTION CREATOR
const fetchCatFacts = () => {
  return function(dispatch) {
    dispatch(fetchCatFactsRequest());
    axios.get(`${BASE_URL}/facts?limit=10`)
      .then(response => {
        const catFacts = response.data.data;
        dispatch(fetchCatFactsSuccess(catFacts));
      })
      .catch(error => {
        dispatch(fetchCatFactsFailure(error.message));
      });
  }
}

// STORE
const store = createStore(reducer, applyMiddleware(thunk));

// SUBSCRIBE
store.subscribe(() => {
  console.log(store.getState());
});

// DISPATCH
store.dispatch(fetchCatFacts());