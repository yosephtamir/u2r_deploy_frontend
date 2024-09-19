import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previousUrl: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPreviousUrl: (state, action) => {
      state.previousUrl = action.payload;
    },
  },
});

export const { setPreviousUrl } = navigationSlice.actions;
export default navigationSlice.reducer;
