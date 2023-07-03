import { createReducer } from "@reduxjs/toolkit";
import cartActions from "../actions/cartActions";
const { getCart, addToCart, removeFromCart, emptyCart } = cartActions;

const initialState = {
  cart: null,
};

const cartReducer = createReducer(initialState, builder => {
  builder
    .addCase(getCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        return { ...state, cart: action.payload.response };
      } else {
        return { ...state, cart: null };
      }
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        return { ...state, cart: action.payload.response };
      } else {
        return state;
      }
    })
    .addCase(removeFromCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        if (action.payload.response.items.length === 0) {
          return { ...state, cart: null };
        } else {
          return { ...state, cart: action.payload.response };
        }
      } else {
        return state;
      }
    })
    .addCase(emptyCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        return { ...state, cart: null };
      } else {
        return state;
      }
    });
});

export default cartReducer;
