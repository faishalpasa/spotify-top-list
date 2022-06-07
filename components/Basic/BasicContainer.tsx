import React, { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import debounce from 'lodash.debounce'

import {
  newsCommentFetch,
  newsCommentAutocompleteFetch,
  newsCommentFormSubmit,
} from 'redux/reducers/newsBasic'

import BasicView from './BasicView'
import { basicSelector } from './basicSelector'

const BasicContainer = () => {
  const dispatch = useDispatch()
  const containerProps = useSelector(basicSelector, shallowEqual)
  const [fields, setFields] = useState({
    name: '',
    comment: '',
  })

  const handleFetchNewsComment = (newsId: number) => dispatch(newsCommentFetch(newsId))

  const handleAutocomplete = debounce((keyword: string) => dispatch(newsCommentAutocompleteFetch(keyword)), 500)

  const handleChangeField = (fieldName: string, value: string) => {
    setFields((prevState) => ({ ...prevState, [fieldName]: value }))
  }

  const handleSubmitForm = () => dispatch(newsCommentFormSubmit(fields))

  const viewProps = {
    ...containerProps,
    handleAutocomplete,
    handleChangeField,
    handleFetchNewsComment,
    handleSubmitForm,
    fields,
  }

  return (
    <BasicView {...viewProps} />
  )
}

export default BasicContainer