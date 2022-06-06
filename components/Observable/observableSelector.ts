import type { RootState } from 'redux/rootReducer'

export const observableSelector = ({ news }: RootState) => ({
  news,
})

export type PropsFromSelector = ReturnType<typeof observableSelector>
