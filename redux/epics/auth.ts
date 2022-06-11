import { of } from 'rxjs'
import { catchError, mergeMap, switchMap, exhaustMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import type { Epic } from 'redux-observable'
import Cookies from 'js-cookie'

import config from 'config'
import { getSpotifyToken, removeSpotifyToken } from 'utils/auth'
import type { EpicDependencies } from 'redux/store'

import {
  AUTH_CHECK,
  AUTH_ME,
  authDataSet,
  authDataReset,
  authMe,
  authMeSet,
  authMeReset,
} from 'redux/reducers/auth'
import { snackbarOpen } from 'redux/reducers/snackbar'

import { AUTH_ME_GET } from 'constants/endpoints'

export const authCheckEpic: Epic = (action$, state$, { api }: EpicDependencies) => action$.pipe(
  ofType(AUTH_CHECK),
  switchMap(() => of(getSpotifyToken()).pipe(
    mergeMap((data: any) => {
      if (data?.expiredAt < Date.now()) {
        removeSpotifyToken()
        return of(authDataReset())
      }
      const initialData = state$.value.auth.data
      const mappedData = {
        ...initialData,
        ...data,
      }
      return of(
        authDataSet(mappedData),
      )
    }),
  )),
)

export const authMeEpic: Epic = (action$, state$, { api }: EpicDependencies) => action$.pipe(
  ofType(AUTH_ME),
  exhaustMap(({ payload }) => api({
    endpoint: AUTH_ME_GET,
    headers: {
      Authorization: `Bearer ${payload}`,
    },
    host: config.spotifyApiUrl,
  }).pipe(
    mergeMap(({ response }: any) => {
      const mappedData = {
        id: response.id,
        displayName: response.display_name,
      }
      const successActions: any = [
        authMeSet(mappedData),
      ]
      if (Cookies.get('welcomeMessage') !== '') {
        Cookies.set('welcomeMessage', '')
        successActions.push(snackbarOpen({
          message: `Hi ${mappedData.displayName}! This is your top list.`,
          duration: 10000,
        }))
      }
      return of(...successActions)
    }),
    catchError((error) => {
      if (error.status === 401) {
        removeSpotifyToken()
        return of(authMeReset())
      }
      return of(
        snackbarOpen({
          message: error?.message || 'Error',
        }),
        authMeReset(),
      )
    }
    )),
  ))
