import { of, debounceTime, forkJoin } from 'rxjs'
import { catchError, mergeMap, switchMap, exhaustMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  NEWS_FETCH,
  NEWS_COMMENT_FETCH,
  NEWS_COMMENT_AUTOCOMPLETE_FETCH,
  NEWS_COMMENT_SUBMIT_FORM,
  newsFetchFailure,
  newsFetchSuccess,
  newsCommentFetchFailure,
  newsCommentFetchSuccess,
  newsCommentAutocompleteFetchFailure,
  newsCommentAutocompleteFetchSuccess,
  newsCommentSubmitFormFailure,
  newsCommentSubmitFormSuccess,
} from 'redux/reducers/news'
import { snackbarOpen } from 'redux/reducers/snackbar'

import { NEWS_GET, NEWS_COMMENT_GET, NEWS_COMMENT_POST } from 'constants/endpoints'

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

export const newsCommentAutocompleteFetchEpic: Epic = (action$, _, { api }: EpicDependencies) => action$.pipe(
  ofType(NEWS_COMMENT_AUTOCOMPLETE_FETCH),
  debounceTime(500),
  mergeMap((action) => api({
    endpoint: NEWS_COMMENT_GET,
    params: {
      newsId: 2,
    },
    query: {
      search: action.payload,
    },
  }).pipe(
    mergeMap(({ response }: any) => of(
      newsCommentAutocompleteFetchSuccess(response),
    )),
    catchError(() => of(
      snackbarOpen({
        message: 'Error',
      }),
      newsCommentAutocompleteFetchFailure(),
    )),
  )),
)

// export const newsCommentsFetchEpic: Epic = (action$, _, { api }: EpicDependencies) => action$.pipe(
//   ofType(NEWS_COMMENT_AUTOCOMPLETE_FETCH),
//   debounceTime(500),
//   switchMap(() => {
//     const apiRequests = {
//       firstFetch: api({
//         endpoint: NEWS_COMMENT_GET,
//         params: { newsId: 3 },
//       }),
//       secondFetch: api({
//         endpoint: NEWS_COMMENT_GET,
//         params: { newsId: 4 },
//       }),
//     }

//     return forkJoin(apiRequests).pipe(
//       mergeMap((responses) => {
//         const firstFetch: any = responses.firstFetch.response
//         return of(newsCommentAutocompleteFetchSuccess(firstFetch))
//       }),
//       catchError((error) => {
//         if (error.code !== 404) {
//           return of(
//             newsCommentFetchFailure(),
//             snackbarOpen({
//               message: 'Error',
//             }),
//           )
//         }
//         return of(newsCommentFetchFailure())
//       }),
//     )
//   })
// )

export const newsCommentSubmitFormEpic: Epic = (action$, _, { api }: EpicDependencies) => action$.pipe(
  ofType(NEWS_COMMENT_SUBMIT_FORM),
  exhaustMap((action) => api({
    endpoint: NEWS_COMMENT_POST,
    params: {
      newsId: 2,
    },
    body: {
      createdAt: new Date().toISOString(),
      body: action.payload.comment,
      name: action.payload.name,
      newsId: 2
    },
  }).pipe(
    mergeMap(() => of(
      newsCommentSubmitFormSuccess(),
    )),
    catchError(() => of(
      snackbarOpen({
        message: 'Error',
      }),
      newsCommentSubmitFormFailure(),
    )),
  )),
)