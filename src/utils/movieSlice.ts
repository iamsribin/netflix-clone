import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface movieState {
    nowPlayingMovies: {} | [] | null;
}

const initialState: movieState = {
nowPlayingMovies: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPlayingMovies: (state, action: PayloadAction<movieState>) => {        
      state.nowPlayingMovies = action.payload;
    },
    // clearUser: (state) => {
    //   state.uid = null;
    //   state.email = null;
    //   state.displayName = null;
    // },
  },
});

export const { setPlayingMovies } = movieSlice.actions;
export default movieSlice.reducer;