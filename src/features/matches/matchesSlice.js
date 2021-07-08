import { createSlice } from '@reduxjs/toolkit'
import util from '../../util'

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
    deleteMatch: (state, action) => {
      state.array.splice(action.payload.index,1);
    },
    clear: (state) => {
      state.array = [];
    },
    setMatches: (state, action) => {
      state.array = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMatch, setMatch, deleteMatch, clear, setMatches } = matchesSlice.actions

export default matchesSlice.reducer
