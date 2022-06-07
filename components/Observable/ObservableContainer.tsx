import React, { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  newsCommentFetch,
  newsCommentAutocompleteFetch,
  newsCommentSubmitForm,
} from 'redux/reducers/news'

import ObservableView from './ObservableView'
import { observableSelector } from './observableSelector'

const ObservableContainer = () => {
  const dispatch = useDispatch()
  const containerProps = useSelector(observableSelector, shallowEqual)
  const [fields, setFields] = useState({
    name: '',
    comment: '',
  })

  const handleFetchNewsComment = (newsId: number) => dispatch(newsCommentFetch(newsId))

  const handleAutocomplete = (keyword: string) => dispatch(newsCommentAutocompleteFetch(keyword))

  const handleChangeField = (fieldName: string, value: string) => {
    setFields((prevState) => ({ ...prevState, [fieldName]: value }))
  }

  const handleSubmitForm = () => dispatch(newsCommentSubmitForm(fields))

  const viewProps = {
    ...containerProps,
    handleAutocomplete,
    handleChangeField,
    handleFetchNewsComment,
    handleSubmitForm,
    fields,
  }

  return (
    <ObservableView {...viewProps} />
  )
}

export default ObservableContainer