import { createReducer } from "@reduxjs/toolkit";
import drinksActions from "../actions/drinkactions";

const {getDrinks, getFilteredDrinks, deleteDrinks} = drinksActions
const initialState = {
    drinks: [],
    loading: false,
    message: ''
}

const drinksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getDrinks.pending, (state, action) => {
            return {...state, loading: true}
        })
        .addCase(getDrinks.fulfilled, (state, action) => {
            return {...state, ...action.payload, loading: false}
        })
        .addCase(getDrinks.rejected, (state, action) => {
            return { ...state, loading: false, message: action.payload.message}
        })
        .addCase(getFilteredDrinks.pending, (state, action) => {
            return {...state, loading: false}
        })
        .addCase(getFilteredDrinks.fulfilled, (state, action) => {
            if(action.payload.success){
                return {...state, ...action.payload, loading: false}
            } else{
                return {...state, drinks: [] , message: action.payload.message}
            }
        })
        .addCase(getFilteredDrinks.rejected, (state, action) => {
            return { ...state ,loading: false, message: action.payload.message}
        })
        .addCase(deleteDrinks.pending, (state, action) => {
            return {...state, loading: true}
        })
        .addCase(deleteDrinks.fulfilled, (state, action) => {
            let filtered = state.drinks.filter(el => el._id !== action.payload.id)
            return {...state, message: action.payload.message, drinks: filtered}
        })
        .addCase(deleteDrinks.rejected, (state, action) => {
            return { ...state, loading: false, message: action.payload.message}
        })
})

export default drinksReducer