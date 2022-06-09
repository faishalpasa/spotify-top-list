import { combineReducers } from 'redux'

import app from 'redux/reducers/app'
import auth from 'redux/reducers/auth'
import snackbar from 'redux/reducers/snackbar'
import spotify from 'redux/reducers/spotify'

const reducers = combineReducers({
  app,
  auth,
  snackbar,
  spotify,
})

export default reducers
export type RootState = ReturnType<typeof reducers>
