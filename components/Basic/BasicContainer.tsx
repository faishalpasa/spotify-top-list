import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  newsCommentFetchBasic,
} from 'redux/reducers/newsBasic'

import BasicView from './BasicView'
import { basicSelector } from './basicSelector'

const BasicContainer = () => {
  const dispatch = useDispatch()
  const containerProps = useSelector(basicSelector, shallowEqual)

  const handleFetchNewsComment = (newsId: number) => dispatch(newsCommentFetchBasic(newsId))

  const viewProps = {
    ...containerProps,
    handleFetchNewsComment,
  }

  return (
    <BasicView {...viewProps} />
  )
}

export default BasicContainer