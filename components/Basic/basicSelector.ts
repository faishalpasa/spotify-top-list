import type { RootState } from 'redux/rootReducer'

export const basicSelector = ({ snackbar, newsBasic }: RootState) => ({
  snackbar,
  news: newsBasic,
})

export type PropsFromSelector = ReturnType<typeof basicSelector>
