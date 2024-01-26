import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// here we are trying to set the initial state  = to if there is anything in the local storage and parsing that to javascript object.
// data we receive from the web server is always in string so we convert them as a javascriot object
// if there is no state found in local storage then we set the initial state as an array object named with cartIems:[];

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(action.payload._id, "action id here");
      const item = action.payload;
      // console.log(item, "item is here");
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // here we are comparing the id of item which is already stored in the local storage or statically created initial state
      // if after comparing its get proved that the id of the stored items product is equal to the existed item which is id which we got from the application side then we will print the item information but if it is not equal then we simple print the initial cartItems

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );

        // but if there is no existed item found then we are directly setting the cartItems state equal to new copy of the cartItems and adding the item which we got from the application side
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
  },
});

// exporting actions
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
