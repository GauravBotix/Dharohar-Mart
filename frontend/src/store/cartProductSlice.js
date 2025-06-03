import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  cart: [],
};

const cartProductSlice = createSlice({
  name: "cartProduct",
  initialState: initialValue,
  reducers: {
    handleAddCart: (state, action) => {
      state.cart = [...action.payload];
    },
  },
});

export const { handleAddCart } = cartProductSlice.actions;
export default cartProductSlice.reducer;
