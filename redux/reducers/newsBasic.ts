import createReducer from 'utils/createReducer'
import axios from 'axios'
import config from 'config'
import type { Dispatch } from 'redux'

import { SNACKBAR_OPEN } from './snackbar'

const { apiHost } = config

export const NEWS_FETCH = 'newsBasic/FETCH'
export const NEWS_FETCH_FAILURE = 'newsBasic/FETCH_FAILURE'
export const NEWS_FETCH_SUCCESS = 'newsBasic/FETCH_SUCCESS'
export const NEWS_SUBMIT = 'newsBasic/SUBMIT'
export const NEWS_SUBMIT_FAILURE = 'newsBasic/SUBMIT_FAILURE'
export const NEWS_SUBMIT_SUCCESS = 'newsBasic/SUBMIT_SUCCESS'
export const NEWS_COMMENT_FETCH = 'newsBasic/COMMENT_FETCH'
export const NEWS_COMMENT_FETCH_FAILURE = 'newsBasic/COMMENT_FETCH_FAILURE'
export const NEWS_COMMENT_FETCH_SUCCESS = 'newsBasic/COMMENT_FETCH_SUCCESS'
export const NEWS_COMMENT_AUTOCOMPLETE_FETCH = 'newsBasic/COMMENT_AUTOCOMPLETE_FETCH'
export const NEWS_COMMENT_AUTOCOMPLETE_FETCH_FAILURE = 'newsBasic/COMMENT_AUTOCOMPLETE_FETCH_FAILURE'
export const NEWS_COMMENT_AUTOCOMPLETE_FETCH_SUCCESS = 'newsBasic/COMMENT_AUTOCOMPLETE_FETCH_SUCCESS'
export const NEWS_COMMENT_SUBMIT_FORM = 'newsBasic/COMMENT_SUBMIT_FORM'
export const NEWS_COMMENT_SUBMIT_FORM_FAILURE = 'newsBasic/COMMENT_SUBMIT_FORM_FAILURE'
export const NEWS_COMMENT_SUBMIT_FORM_SUCCESS = 'newsBasic/COMMENT_SUBMIT_FORM_SUCCESS'

export interface News {
  id: number
  createdAt: string
  createdBy: string
  title: string
  slug: string
  body: string
}

export interface Comment {
  id: number
  newsId: number
  name: string
  body: string
  createdAt: string
}

export interface NewsInitialState {
  data: News[]
  comments: Comment[]
  autocompleteComments: Comment[]
  isLoading: boolean
  isError: boolean
}

const INITIAL_STATE: NewsInitialState = {
  data: [],
  comments: [],
  autocompleteComments: [],
  isLoading: false,
  isError: false,
}

export default createReducer(INITIAL_STATE, {
  [NEWS_FETCH]: (state) => {
    state.isLoading = true
  },
  [NEWS_FETCH_FAILURE]: (state) => {
    state.isLoading = false
    state.isError = true
  },
  [NEWS_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.data = action.payload
  },
  [NEWS_COMMENT_FETCH]: (state) => {
    state.isLoading = true
  },
  [NEWS_COMMENT_FETCH_FAILURE]: (state) => {
    state.isLoading = false
    state.isError = true
  },
  [NEWS_COMMENT_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.comments = action.payload
  },
  [NEWS_COMMENT_AUTOCOMPLETE_FETCH]: (state) => {
    state.isLoading = true
  },
  [NEWS_COMMENT_AUTOCOMPLETE_FETCH_FAILURE]: (state) => {
    state.isLoading = false
    state.isError = true
  },
  [NEWS_COMMENT_AUTOCOMPLETE_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.autocompleteComments = action.payload
  },
})

// actions

export const newsCommentFetch: any = (newsId: number) => (dispatch: Dispatch) => {
  dispatch({ type: NEWS_COMMENT_FETCH })
  axios({
    method: 'get',
    url: `${apiHost}/v1/news/${newsId}/comments`,
  }).then((response) => {
    const { data, status } = response

    if (status === 200) {
      dispatch({ type: NEWS_COMMENT_FETCH_SUCCESS, payload: data })
      dispatch({ type: SNACKBAR_OPEN, payload: { message: 'Successfully fetched comments' } })
    } else {
      dispatch({ type: NEWS_COMMENT_FETCH_FAILURE })
    }
  })
}
export const newsCommentAutocompleteFetch: any = (keyword: string) => (dispatch: Dispatch) => {
  dispatch({ type: NEWS_COMMENT_AUTOCOMPLETE_FETCH })
  axios({
    method: 'get',
    url: `${apiHost}/v1/news/comments/autocomplete?keyword=${keyword}`,
  }).then((response) => {
    const { data, status } = response

    if (status === 200) {
      dispatch({ type: NEWS_COMMENT_AUTOCOMPLETE_FETCH_SUCCESS, payload: data })
    } else {
      dispatch({ type: NEWS_COMMENT_AUTOCOMPLETE_FETCH_FAILURE })
    }
  })
}
export const newsCommentFormSubmit: any = (fields: { name: string, comment: string }) => (dispatch: Dispatch) => {
  dispatch({ type: NEWS_COMMENT_SUBMIT_FORM })
  axios({
    method: 'post',
    url: `${apiHost}/v1/news/1/comments`,
    data: {
      createdAt: new Date().toISOString(),
      body: fields.comment,
      name: fields.name,
      newsId: 1
    },
  }).then((response) => {
    const { data, status } = response

    if (status === 200) {
      dispatch({ type: NEWS_COMMENT_SUBMIT_FORM_SUCCESS, payload: data })
    } else {
      dispatch({ type: NEWS_COMMENT_SUBMIT_FORM_FAILURE })
    }
  })
}