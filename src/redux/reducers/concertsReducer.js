import { createReducer } from "@reduxjs/toolkit";
import concertsActions from "../actions/concertsActions";
const { getInitialData, getQuery } = concertsActions;

const initialState = {
  concerts: [],
  name: "",
  type: "",
  initial: true,
  loading: true,
  message: ""
};

const concertsReducer = createReducer(initialState, builder => {
  builder
    .addCase(getInitialData.fulfilled, (state, action) => {
      if (action.payload.success) {
        return { ...state, concerts: action.payload.response, initial: false, loading: false };
      } else {
        return { ...state, concerts: [], initial: false, loading: false, message: action.payload.message };
      }
    })
    .addCase(getQuery.fulfilled, (state, action) => {
      if (action.payload.success) {
        return { ...state, concerts: action.payload.response, name: action.payload.query.name, type: action.payload.query.type };
      } else {
        return { ...state, concerts: [], name: action.payload.query.name, message: action.payload.message };
      }
    });
});

export default concertsReducer;
