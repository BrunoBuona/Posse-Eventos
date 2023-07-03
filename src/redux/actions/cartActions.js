import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/url";

const getCart = createAsyncThunk("getCart", async data => {
  try {
    const res = await axios.get(`${BASE_URL}/api/carts`, data.headers);
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

const addToCart = createAsyncThunk("addToCart", async data => {
  try {
    let res = await axios.post(`${BASE_URL}/api/carts`, data.body, data.headers);
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

const removeFromCart = createAsyncThunk("removeFromCart", async data => {
  try {
    let res = await axios.delete(`${BASE_URL}/api/carts?concertId=${data.concertId}`, data.headers);
    return {
      success: res.data.success,
      response: res.data.response,
      message: res.data.message
    }
  }catch(error) {
    let message = error.response ? error.response.data.message || error.response.data : error.message;
    return { success: false, message };
  }
});

const emptyCart = createAsyncThunk("emptyCart", async data => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/carts/${data.cartId}`, data.headers);
    return {
      success: res.data.success,
    };
  } catch (error) {
    let message = error.response ? error.response.data.message || error.response.data : error.message;
    return { success: false, message };
  }
});

const cartActions = {
  getCart,
  addToCart,
  removeFromCart,
  emptyCart,
};

export default cartActions;
