import { of, debounceTime, forkJoin } from 'rxjs'
import { catchError, mergeMap, switchMap, exhaustMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import type { Epic } from 'redux-observable'

import { getSpotifyToken, removeSpotifyToken } from 'utils/auth'
import type { EpicDependencies } from 'redux/store'

import config from 'config'
import {
  SPOTIFY_TRACKS_FETCH,
  SPOTIFY_ARTISTS_FETCH,
  spotifyTracksFetchFailure,
  spotifyTracksFetchSuccess,
  spotifyArtistsFetchFailure,
  spotifyArtistsFetchSuccess
} from 'redux/reducers/spotify'
import { snackbarOpen } from 'redux/reducers/snackbar'

import { SPOTIFY_TOP_TRACKS_GET, SPOTIFY_TOP_ARTISTS_GET } from 'constants/endpoints'

export const spotifyTracksFetchEpic: Epic = (action$, state$, { api }: EpicDependencies) => action$.pipe(
  ofType(SPOTIFY_TRACKS_FETCH),
  mergeMap(() => api({
    endpoint: SPOTIFY_TOP_TRACKS_GET,
    query: {
      limit: 10,
      offset: 0,
      time_range: 'medium_term'
    },
    headers: {
      Authorization: `Bearer ${state$.value.auth.data.accessToken}`,
    },
    host: config.spotifyApiUrl,
  }).pipe(
    mergeMap(({ response }: any) => of(
      spotifyTracksFetchSuccess(response),
    )),
    catchError((error) => of(
      snackbarOpen({
        message: error?.message || 'Error',
      }),
      spotifyTracksFetchFailure(),
    )),
  )),
)

export const spotifyArtistsFetchEpic: Epic = (action$, state$, { api }: EpicDependencies) => action$.pipe(
  ofType(SPOTIFY_ARTISTS_FETCH),
  mergeMap(() => api({
    endpoint: SPOTIFY_TOP_ARTISTS_GET,
    query: {
      limit: 10,
      offset: 0,
      time_range: 'medium_term'
    },
    headers: {
      Authorization: `Bearer ${state$.value.auth.data.accessToken}`,
    },
    host: config.spotifyApiUrl,
  }).pipe(
    mergeMap(({ response }: any) => of(
      spotifyArtistsFetchSuccess(response),
    )),
    catchError((error) => of(
      snackbarOpen({
        message: error?.message || 'Error',
      }),
      spotifyArtistsFetchFailure(),
    )),
  )),
)