import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/url";

const getDrinks = createAsyncThunk('getDrinks', async() => {
    try {
        let res = await axios.get(`${BASE_URL}/api/drink`)
        return {
            drinks: res.data.data,
            success: res.data.success,
            message: res.data.message,
        }
    } catch (error) {
        let err
        error.response ?
        err = error.response.data.message :
        err = error.message
        return {
            success: false,
            message: err
        }
    }
})

const getFilteredDrinks = createAsyncThunk('getFilteredDrinks', async(filter) => {
    try {
        let searchQuery = filter.name
        let res = await axios.get(`${BASE_URL}/api/drink?name=${searchQuery}`)
        return {
            drinks: res.data.data,
            success: res.data.success,
            message: res.data.message
        }
    } catch (error) {
        let err
        error.response ?
        err = error.response.data.message :
        err = error.message
        return {
            success: false,
            message: err
        }
    }
})

const deleteDrink = createAsyncThunk('deleteDrink', async({id, token}) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.delete(`${BASE_URL}/api/drink/${id}`, headers)
        return {
            id: res.data.data,
            success: res.data.success,
            message: res.data.message
        }
    } catch (error) {
        let err
        error.response ?
        err = error.response.data.message :
        err = error.message
        return {
            success: false,
            message: err
        }
    }
})

const drinksActions = {
    getDrinks,
    getFilteredDrinks,
    deleteDrink
}
export default drinksActions