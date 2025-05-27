import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allcategory: [],
  subcategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allcategory = [...action.payload];
    },
    setSubcategory: (state, action) => {
      state.subcategory = [...action.payload];
    },
  },
});

export const { setAllCategory, setSubcategory } = productSlice.actions;

export default productSlice.reducer;
