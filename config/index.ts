const apiUrl = process.env.NEXT_PUBLIC_API_URL
const appName = process.env.NEXT_PUBLIC_NAME
const nodeEnv = process.env.NODE_ENV
const spotifyAuthUrl = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL
const spotifyRedirectUrl = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL
const spotifyApiUrl = process.env.NEXT_PUBLIC_SPOTIFY_API_URL
const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const spotifyClientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

export default {
  apiUrl,
  appName,
  nodeEnv,
  spotifyAuthUrl,
  spotifyRedirectUrl,
  spotifyApiUrl,
  spotifyClientId,
  spotifyClientSecret,
}
