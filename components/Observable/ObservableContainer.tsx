import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  newsCommentFetch,
} from 'redux/reducers/news'

import ObservableView from './ObservableView'
import { observableSelector } from './observableSelector'

const ObservableContainer = () => {
  const dispatch = useDispatch()
  const containerProps = useSelector(observableSelector, shallowEqual)

  const handleFetchNewsComment = (newsId: number) => dispatch(newsCommentFetch(newsId))

  const viewProps = {
    ...containerProps,
    handleFetchNewsComment,
  }

  return (
    <ObservableView {...viewProps} />
  )
}

export default ObservableContainer