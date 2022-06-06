import { of } from 'rxjs'
import { catchError, mergeMap, switchMap, exhaustMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  NEWS_FETCH,
  NEWS_COMMENT_FETCH,
  newsFetchFailure,
  newsFetchSuccess,
  newsCommentFetchFailure,
  newsCommentFetchSuccess,
} from 'redux/reducers/news'
import { snackbarOpen } from 'redux/reducers/snackbar'

import { NEWS_GET, NEWS_COMMENT_GET } from 'constants/endpoints'

export const newsFetchEpic: Epic = (action$, _, { api }: EpicDependencies) => action$.pipe(
  ofType(NEWS_FETCH),
  mergeMap(() => api({
    endpoint: NEWS_GET,
  }).pipe(
    mergeMap(({ response }: any) => of(
      newsFetchSuccess(response),
      snackbarOpen({
        message: 'News fetched successfully',
      }),
    )),
    catchError(() => of(
      snackbarOpen({
        message: 'Error',
      }),
      newsFetchFailure(),
    )),
  )),
)

export const newsCommentFetchEpic: Epic = (action$, _, { api }: EpicDependencies) => action$.pipe(
  ofType(NEWS_COMMENT_FETCH),
  mergeMap((action) => api({
    endpoint: NEWS_COMMENT_GET,
    params: {
      newsId: action.payload,
    },
  }).pipe(
    mergeMap(({ response }: any) => of(
      newsCommentFetchSuccess(response),
      snackbarOpen({
        message: 'Successfully fetched comments using redux-observable',
      }),
    )),
    catchError(() => of(
      snackbarOpen({
        message: 'Error',
      }),
      newsCommentFetchFailure(),
    )),
  )),
)