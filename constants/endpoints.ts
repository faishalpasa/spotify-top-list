export type Endpoint = ['get' | 'post' | 'put' | 'patch' | 'delete', string]

export const AUTH_LOGIN_POST: Endpoint = ['post', 'api/spotify/login']
export const AUTH_ME_GET: Endpoint = ['get', 'v1/me']
export const SPOTIFY_TOP_TRACKS_GET: Endpoint = ['get', 'v1/me/top/tracks']
export const SPOTIFY_TOP_ARTISTS_GET: Endpoint = ['get', 'v1/me/top/artists']
