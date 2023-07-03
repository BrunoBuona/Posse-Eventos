import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/url";

const getInitialData = createAsyncThunk("getInitialData", async data => {
  try {
    const res = await axios.get(`${BASE_URL}/api/concerts`);
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
const getQuery = createAsyncThunk("getQuery", async data => {
  try {
    const res = await axios.get(`${BASE_URL}/api/concerts`, data.query);
    return {
      success: res.data.success,
      response: res.data.response,
      query: data.query.params,
      message: res.data.message,
    };
  } catch (error) {
    let message = error.response ? error.response.data.message || error.response.data : error.message;
    return { success: false, message, query: data.query.params };
  }
});

const concertsActions = {
  getInitialData,
  getQuery,
};

export default concertsActions;
