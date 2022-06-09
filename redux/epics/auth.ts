import { of, debounceTime, forkJoin } from 'rxjs'
import { catchError, mergeMap, switchMap, exhaustMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import type { Epic } from 'redux-observable'

import { getSpotifyToken, removeSpotifyToken } from 'utils/auth'
import type { EpicDependencies } from 'redux/store'

import {
  AUTH_LOGIN,
  AUTH_CHECK,
  authLoginFailure,
  authLoginSuccess,
  authDataSet,
  authDataReset,
} from 'redux/reducers/auth'
import { snackbarOpen } from 'redux/reducers/snackbar'

import { AUTH_LOGIN_POST } from 'constants/endpoints'

export const authLoginEpic: Epic = (action$, _, { api }: EpicDependencies) => action$.pipe(
  ofType(AUTH_LOGIN),
  mergeMap(() => api({
    endpoint: AUTH_LOGIN_POST,
  }).pipe(
    mergeMap(({ response }: any) => of(
      authLoginSuccess(),
      snackbarOpen({
        message: 'News fetched successfully',
      }),
    )),
    catchError((error) => of(
      snackbarOpen({
        message: error?.message || 'Error',
      }),
      authLoginFailure(),
    )),
  )),
)

export const authCheckEpic: Epic = (action$, state$, { api }: EpicDependencies) => action$.pipe(
  ofType(AUTH_CHECK),
  switchMap(() => of(getSpotifyToken()).pipe(
    mergeMap((data: any) => {
      if (data?.expiredAt < Date.now()) {
        return of(authDataReset())
      }
      const initialData = state$.value.auth.data
      const mappedData = {
        ...initialData,
        ...data,
      }
      return of(authDataSet(mappedData))
    }),
  )),
)
