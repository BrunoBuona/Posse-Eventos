import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/url";

const getInitialVenues = createAsyncThunk("getInitialVenues", async data => {
  try {
    const res = await axios.get(`${BASE_URL}/api/venues`);
    return {
      success: res.data.success,
      response: res.data.response,
      message: res.data.message,
    };
  } catch (error) {
    let message = error.response ? error.response.data.message || error.response.data : error.message;
    return { success: false, message };
  }
});

const deleteVenue = createAsyncThunk("deleteVenue", async data => {
  const { id, headers } = data;
  try {
    const res = await axios.delete(`${BASE_URL}/api/venues/${id}`, headers);
    return {
      success: true,
      id: res.data.response,
      message: res.data.message,
    };
  } catch (error) {
    let message = error.response ? error.response.data.message || error.response.data : error.message;
    return { success: false, message };
  }
});

const adminVenuesActions = {
  getInitialVenues,
  deleteVenue
};

export default adminVenuesActions;
