import { createReducer } from "@reduxjs/toolkit";
import drinksActions from "../actions/drinkactions";

const {getDrinks, getFilteredDrinks, deleteDrink} = drinksActions
const initialState = {
    drinks: [],
    loading: false,
    message: ''
}

const drinksReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(getDrinks.fulfilled, (state, action) => {
        if (action.payload.success) {
            console.log(action.payload.response)
          return { ...state, drinks: action.payload.response, loading: false };
        } else {
          return { ...state, drinks: [], loading: false, message: action.payload.message };
        }
      })
        .addCase(getFilteredDrinks.rejected, (state, action) => {
            return { ...state ,loading: false, message: action.payload.message}
        })
        .addCase(deleteDrink.pending, (state, action) => {
            return {...state, loading: true}
        })
        .addCase(deleteDrink.fulfilled, (state, action) => {
            let filtered = state.drinks.filter(el => el._id !== action.payload.id)
            return {...state, message: action.payload.message, drinks: filtered}
        })
        .addCase(deleteDrink.rejected, (state, action) => {
            return { ...state, loading: false, message: action.payload.message}
        })
})

export default drinksReducer