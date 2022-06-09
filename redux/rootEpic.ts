import { combineEpics } from 'redux-observable'

import * as auth from 'redux/epics/auth'
import * as spotify from 'redux/epics/spotify'

export default combineEpics(
  ...Object.values(auth),
  ...Object.values(spotify),
)
