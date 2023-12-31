
import artistsReducer from "./artistReducer"
import concertsReducer from './concertsReducer';
import filterArtistReducer from "./filterArtistReducer";
import adminConcertsReducer from './adminConcertsReducer';
import userReducers from './userReducers';
import adminVenuesReducer from "./AdminVenuesReducer";
import cartReducer from "./cartReducer";
import drinksReducer from "./drinksReducer";

const rootReducer = {
    artistsReducer,
    drinksReducer,
    filterArtistReducer,
    concerts: concertsReducer,
    user: userReducers,
    adminConcerts: adminConcertsReducer,
    adminVenues: adminVenuesReducer,
    cart: cartReducer
}

export default rootReducer