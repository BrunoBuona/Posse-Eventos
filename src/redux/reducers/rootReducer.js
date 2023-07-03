
import artistsReducer from "./artistReducer"
import concertsReducer from './concertsReducer';
import filterArtistReducer from "./filterArtistReducer";
import adminConcertsReducer from './adminConcertsReducer';
import userReducers from './userReducers';
import adminVenuesReducer from "./AdminVenuesReducer";
import cartReducer from "./cartReducer";

const rootReducer = {
    artistsReducer,
    filterArtistReducer,
    concerts: concertsReducer,
    user: userReducers,
    adminConcerts: adminConcertsReducer,
    adminVenues: adminVenuesReducer,
    cart: cartReducer
}

export default rootReducer