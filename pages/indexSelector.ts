import type { RootState } from 'redux/rootReducer'

export const indexSelector = ({ snackbar }: RootState) => ({
  snackbar,
})

export type PropsFromSelector = ReturnType<typeof indexSelector>
