import {createAction} from '@reduxjs/toolkit'

const setChecked = createAction('setChecked', (checked) => {
    return {
        payload:{
            genre: checked
        }
    }
})
const setSearched = createAction('setSearched', (searched) => {
    return {
        payload:{
            name: searched
        }
    }
})
const filterArtistActions = {
    setChecked,
    setSearched
}
export default filterArtistActions