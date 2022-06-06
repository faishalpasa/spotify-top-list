import { combineReducers } from 'redux'

import app from 'redux/reducers/app'
import news from 'redux/reducers/news'
import newsBasic from 'redux/reducers/newsBasic'
import snackbar from 'redux/reducers/snackbar'

const reducers = combineReducers({
  app,
  news,
  newsBasic,
  snackbar,
})

export default reducers
export type RootState = ReturnType<typeof reducers>
