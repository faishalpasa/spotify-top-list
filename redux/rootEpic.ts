import { combineEpics } from 'redux-observable'

import * as news from 'redux/epics/news'

export default combineEpics(
  ...Object.values(news),
)
