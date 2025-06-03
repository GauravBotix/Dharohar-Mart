import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import productReducer from "./productSlice.js";
import cartProductReducer from "./cartProductSlice.js";
import addressReducer from "./addressSlice.js";
import orderReducer from './orderSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartProductReducer,
    address: addressReducer,
    order:orderReducer,
  },
});
