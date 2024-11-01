import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload); 
    },
    removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
