import {createReducer} from '@reduxjs/toolkit'
import filterArtistActions from '../actions/fiterArtistActions'

const {setChecked, setSearched} = filterArtistActions
const initialState = {
        genre: [],
        name: ''
}

const filterArtistReducer = createReducer(initialState, builder => {
    builder
        .addCase(setChecked, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
        .addCase(setSearched, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
})

export default filterArtistReducer