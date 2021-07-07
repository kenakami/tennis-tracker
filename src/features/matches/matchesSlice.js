import { createSlice } from '@reduxjs/toolkit'

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    array: [],
  },
  reducers: {
    addMatch: (state, action) => {
      state.array.push(action.payload.data);
    },
    setMatch: (state, action) => {
      state.array[action.payload.index] = action.payload.data;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMatch, setMatch } = matchesSlice.actions

export default matchesSlice.reducer
