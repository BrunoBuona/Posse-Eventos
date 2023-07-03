import { createReducer } from "@reduxjs/toolkit";
import adminVenuesActions from "../actions/AdminVenuesActions";
const { getInitialVenues, deleteVenue } = adminVenuesActions;

const initialState = {
  venues: [],
  message: "",
  loading: false,
};

const adminVenuesReducer = createReducer(initialState, builder => {
  builder
    .addCase(getInitialVenues.fulfilled, (state, action) => {
      if (action.payload.success) {
        return { ...state, venues: action.payload.response, loading: false };
      } else {
        return { ...state, venues: [], loading: false, message: action.payload.message };
      }
    })
    .addCase(deleteVenue.fulfilled, (state, action) => {
      if (action.payload.success) {
        let newVenues = state.venues.filter(venue => venue._id !== action.payload.id);
        return { ...state, venues: newVenues };
      } else {
        return { ...state, message: action.payload.message };
      }
    });
}); 

export default adminVenuesReducer;
