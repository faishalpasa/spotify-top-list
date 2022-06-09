import querystring from 'query-string'
import Cookies from 'js-cookie'

import { SPOTIFY_TOKEN } from 'constants/token'

export const hasSpotifyToken = () => (!!Cookies.get(SPOTIFY_TOKEN))

export const getSpotifyToken = () => {
  const data = Cookies.get(SPOTIFY_TOKEN)
  if (data) {
    const decodedData = Buffer.from(data, 'base64').toString('ascii')
    return querystring.parse(decodedData)
  }
  return null
}

export const setSpotifyToken = (data: Record<string, unknown>) => {
  const stringifyData = querystring.stringify(data)
  const decodedData = Buffer.from(stringifyData).toString('base64')
  try {
    Cookies.set(SPOTIFY_TOKEN, decodedData)
    return true
  } catch (e) {
    return false
  }
}

export const removeSpotifyToken = () => {
  Cookies.remove(SPOTIFY_TOKEN)
}