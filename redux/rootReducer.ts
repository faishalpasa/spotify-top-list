import { combineReducers } from 'redux'

import app from 'redux/reducers/app'
import comment from 'redux/reducers/comment'
import snackbar from 'redux/reducers/snackbar'

const reducers = combineReducers({
  app,
  comment,
  snackbar,
})

export default reducers
export type RootState = ReturnType<typeof reducers>
