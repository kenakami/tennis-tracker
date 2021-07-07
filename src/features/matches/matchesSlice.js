import { createSlice } from '@reduxjs/toolkit'

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    array: [],
  },
  reducers: {
    addMatch: (state, action) => {
      state.array.push(action.payload);
    },
    setMatch: (state, action) => {
      state.array[action.index] = action.data;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMatch, setMatch } = matchesSlice.actions

export default matchesSlice.reducer
