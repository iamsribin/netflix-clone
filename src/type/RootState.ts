
import { UserState } from '../utils/userSlice';
import {movieState} from "../utils/movieSlice"
import { CartState } from '../utils/cartSlice';

export interface RootState {
  user: UserState;
  movies: movieState;
  cart: CartState;
}