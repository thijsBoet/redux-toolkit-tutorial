const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  numOfPizzas: 10,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfPizzas--;
    },
    restocked: (state, action) => {
      state.numOfPizzas += action.payload;
    },
  }
})

export default pizzaSlice.reducer
export const pizzaActions = pizzaSlice.actions