import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (num) => {
  return Math.round(num * 100) / 100;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calculate items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // calculate shipping price(if order is over $100 then free, else it will be 10$ shipping)

      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

      // calculate tax price(15% tax)
      // we are using this formula to calculate the tax of items price
      // First, convert tax percentage to a decimal
      // tax rate = 15% / 100 = 0.15
      // Then use the formula to calculate the total:
      // total = price + (price x tax rate)
      // = 1,500.00 + (1,500.00 x 0.15)
      // = 1,500.00 + 225.00
      // = 1,725.00

      state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

      // calculate total price

      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      // here we are storing the state value in the local storage and also converting JavaScript objects into strings.
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// exporting actions
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
