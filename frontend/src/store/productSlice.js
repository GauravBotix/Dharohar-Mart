import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allcategory: [],
  loadingCategory: false,
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
    setLoadidngCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },
    setSubcategory: (state, action) => {
      state.subcategory = [...action.payload];
    },
  },
});

export const { setAllCategory, setSubcategory, setLoadidngCategory } = productSlice.actions;

export default productSlice.reducer;
