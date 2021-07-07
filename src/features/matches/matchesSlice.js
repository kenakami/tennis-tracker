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
    deleteMatch: (state, action) => {
      state.array.splice(action.payload.index,1);
    },
    clear: (state) => {
      state.array = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMatch, setMatch, deleteMatch, clear } = matchesSlice.actions

export default matchesSlice.reducer
