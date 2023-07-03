import { createReducer } from "@reduxjs/toolkit";
import adminConcertsActions from "../actions/adminConcertsActions";
const { getInitialData, deleteConcert } = adminConcertsActions;

const initialState = {
  concerts: [],
  message: "",
  loading: false,
};

const adminConcertsReducer = createReducer(initialState, builder => {
  builder
    .addCase(getInitialData.fulfilled, (state, action) => {
      if (action.payload.success) {
        return { ...state, concerts: action.payload.response, loading: false };
      } else {
        return { ...state, concerts: [], loading: false, message: action.payload.message };
      }
    })
    .addCase(deleteConcert.fulfilled, (state, action) => {
      if (action.payload.success) {
        let newConcerts = state.concerts.filter(concert => concert._id !== action.payload.id);
        return { ...state, concerts: newConcerts };
      } else {
        return { ...state, message: action.payload.message };
      }
    });
}); 

export default adminConcertsReducer;
