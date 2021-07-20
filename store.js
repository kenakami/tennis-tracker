import { configureStore } from '@reduxjs/toolkit'
import matchesReducer from './src/features/matches/matchesSlice'
import undoable from 'redux-undo'

export default configureStore({
  reducer: {
    matches: undoable(matchesReducer),
  },
})
