import createReducer from 'utils/createReducer'

export const SNACKBAR_CLOSE = 'snackbar/CLOSE'
export const SNACKBAR_OPEN = 'snackbar/OPEN'

export interface SnakcbarInitialState {
  duration: number
  isOpen: boolean
  message: string
}

const INITIAL_STATE: SnakcbarInitialState = {
  duration: 5000,
  isOpen: false,
  message: '',
}

export default createReducer(INITIAL_STATE, {
  [SNACKBAR_OPEN]: (state, action) => {
    state.isOpen = true
    state.message = action.payload.message
    state.duration = action.payload.duration
  },
  [SNACKBAR_CLOSE]: (state) => {
    state.isOpen = INITIAL_STATE.isOpen
    state.message = INITIAL_STATE.message
    state.duration = INITIAL_STATE.duration
  },
})

export const snackbarClose = () => ({
  type: SNACKBAR_CLOSE,
})
export const snackbarOpen = ({
  message = '',
  duration = 5000,
}: { message: SnakcbarInitialState['message'], duration?: SnakcbarInitialState['duration'] }) => ({
  type: SNACKBAR_OPEN,
  payload: {
    message,
    duration,
  },
})
