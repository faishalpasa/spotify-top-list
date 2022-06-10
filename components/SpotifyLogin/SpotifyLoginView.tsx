import React, { useEffect, memo } from 'react'
import querystring from 'query-string'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'

import config from 'config'

import { authDataSet } from 'redux/reducers/auth'
import { snackbarOpen } from 'redux/reducers/snackbar'
import { setSpotifyToken } from 'utils/auth'

const {
  spotifyAuthUrl,
  spotifyRedirectUrl,
  spotifyClientId,
} = config

const state = 'uje' // random string
const scope = 'user-read-recently-played user-top-read'

export const redirectToSpotifyAuth = () => {
  const query = querystring.stringify({
    response_type: 'code',
    client_id: spotifyClientId,
    scope,
    redirect_uri: spotifyRedirectUrl,
    state
  })
  const currentPath = window.location.pathname
  Cookies.set('loginRedirect', currentPath)
  window.location.href = `${spotifyAuthUrl}/authorize?${query}`
}

const SpotifyLoginView = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (router.query.access_token) {
      const expiresIn = router.query.expires_in || 3600
      const expiredAt = dayjs().add(expiresIn as number, 'second').valueOf()
      const mappedData = {
        accessToken: router.query?.access_token as string,
        refreshToken: router.query?.refresh_token as string,
        expiresIn: expiresIn as number,
        expiredAt,
      }

      setSpotifyToken(mappedData)
      dispatch(authDataSet(mappedData))
      router.push(Cookies.get('loginRedirect') || '/')
    }

    if (router.query.error) {
      dispatch(snackbarOpen({
        message: router.query.message as string,
      }))
      router.push(Cookies.get('loginRedirect') || '/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.query])

  return(
    <Button
      variant="contained"
      onClick={redirectToSpotifyAuth}
      color="success"
    >
      Login Spotify
    </Button>
  )
}

export default memo(SpotifyLoginView)