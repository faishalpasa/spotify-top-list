import createReducer from 'utils/createReducer'

export const NEWS_FETCH = 'news/FETCH'
export const NEWS_FETCH_FAILURE = 'news/FETCH_FAILURE'
export const NEWS_FETCH_SUCCESS = 'news/FETCH_SUCCESS'
export const NEWS_SUBMIT = 'news/SUBMIT'
export const NEWS_SUBMIT_FAILURE = 'news/SUBMIT_FAILURE'
export const NEWS_SUBMIT_SUCCESS = 'news/SUBMIT_SUCCESS'
export const NEWS_COMMENT_FETCH = 'news/COMMENT_FETCH'
export const NEWS_COMMENT_FETCH_FAILURE = 'news/COMMENT_FETCH_FAILURE'
export const NEWS_COMMENT_FETCH_SUCCESS = 'news/COMMENT_FETCH_SUCCESS'

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
  isLoading: boolean
  isError: boolean
}

const INITIAL_STATE: NewsInitialState = {
  data: [],
  comments: [],
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
})

export const newsFetch = () => ({
  type: NEWS_FETCH,
})
export const newsFetchFailure = () => ({
  type: NEWS_FETCH_FAILURE,
})
export const newsFetchSuccess = (data: News[]) => ({
  type: NEWS_FETCH_SUCCESS,
  payload: data,
})
export const newsSubmit = (fields: News) => ({
  type: NEWS_SUBMIT,
  payload: fields,
})
export const newsSubmitFailure = () => ({
  type: NEWS_SUBMIT_FAILURE,
})
export const newsSubmitSuccess = (data: News) => ({
  type: NEWS_SUBMIT_SUCCESS,
  payload: data,
})
export const newsCommentFetch = (newsId: number) => ({
  type: NEWS_COMMENT_FETCH,
  payload: newsId,
})
export const newsCommentFetchFailure = () => ({
  type: NEWS_COMMENT_FETCH_FAILURE,
})
export const newsCommentFetchSuccess = (data: News[]) => ({
  type: NEWS_COMMENT_FETCH_SUCCESS,
  payload: data,
})
