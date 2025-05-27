import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id : "",
  name : "",
  email : "",
  avatar : "",
  mobile : "",
  verify_email : "",
  last_login_date : "",
  status : "",
  address_details : [],
  shopping_cart : [],
  orderHistory : [],
  role : "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload?._id;
      state.email = action.payload?.email;
      state.name = action.payload?.name;
      state.verify_email = action.payload?.verify_email;
      state.last_login_date = action.payload?.last_login_date;
      state.status = action.payload?.status;
      state.address_details = action.payload?.address_details;
      state.shopping_cart = action.payload?.shopping_cart;
      state.orderHistory = action.payload?.orderHistory;
      state.role = action.payload?.role;
      state.avatar = action.payload?.avatar;
      state.mobile = action.payload?.mobile;
    },
    updatedAvatar : (state,action)=>{
      state.avatar = action.payload?.avatar
  },
    logout: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.verify_email = "";
      state.last_login_date = "";
      state.status = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.orderHistory = [];
      state.avatar = "";
      state.role = "";
      state.mobile = "";

    },
  },
});

export const { setUserDetails ,logout,updatedAvatar } = userSlice.actions;
export default userSlice.reducer;
