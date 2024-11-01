import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import {RootState} from "../type/RootState"
import movieReducer from "./movieSlice"
import cartReducer from "./cartSlice"

const appStore = configureStore<RootState>({
    reducer:{
        user:userReducer,
        movies: movieReducer,
        cart: cartReducer
    }
});

export default appStore;