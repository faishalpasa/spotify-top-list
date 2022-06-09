import type { RootState } from 'redux/rootReducer'

export const indexSelector = ({ auth, spotify, snackbar }: RootState) => ({
  auth,
  spotify,
  snackbar,
})

export type PropsFromSelector = ReturnType<typeof indexSelector>
