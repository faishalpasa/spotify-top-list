import createReducer from 'utils/createReducer'

export const AUTH_CHECK = 'auth/CHECK'
export const AUTH_LOGIN = 'auth/LOGIN'
export const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE'
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const AUTH_DATA_SET = 'Auth/DATA_SET'
export const AUTH_DATA_RESET = 'Auth/DATA_RESET'
export const AUTH_ME = 'Auth/ME'
export const AUTH_ME_SET = 'Auth/ME_SET'
export const AUTH_ME_RESET = 'Auth/ME_RESET'

export interface AuthInitialState {
  data: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
  me: {
    id: string
    displayName: string
  }
  isLoading: boolean
  isError: boolean
}

const INITIAL_STATE: AuthInitialState = {
  data: {
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
  },
  me: {
    id: '',
    displayName: '',
  },
  isLoading: false,
  isError: false,
}

export default createReducer(INITIAL_STATE, {
  [AUTH_LOGIN]: (state) => {
    state.isLoading = true
  },
  [AUTH_LOGIN_FAILURE]: (state) => {
    state.isLoading = false
    state.isError = true
  },
  [AUTH_LOGIN_SUCCESS]: (state) => {
    state.isLoading = false
    state.isError = false
  },
  [AUTH_DATA_SET]: (state, action) => {
    state.data = action.payload
  },
  [AUTH_DATA_RESET]: (state) => {
    state.data = { ...INITIAL_STATE.data }
  },
  [AUTH_ME_SET]: (state, action) => {
    state.me = action.payload
  },
  [AUTH_ME_RESET]: (state) => {
    state.me = { ...INITIAL_STATE.me }
  },
})

export const authCheck = () => ({
  type: AUTH_CHECK,
})
export const authLogin = () => ({
  type: AUTH_LOGIN,
})
export const authLoginFailure = () => ({
  type: AUTH_LOGIN_FAILURE,
})
export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
})
export const authDataSet = (data: AuthInitialState['data']) => ({
  type: AUTH_DATA_SET,
  payload: data,
})
export const authDataReset = () => ({
  type: AUTH_DATA_RESET,
})
export const authMe = (token: AuthInitialState['data']['accessToken']) => ({
  type: AUTH_ME,
  payload: token,
})
export const authMeSet = (data: AuthInitialState['me']) => ({
  type: AUTH_ME_SET,
  payload: data,
})
export const authMeReset = () => ({
  type: AUTH_ME_RESET,
})