import createReducer from 'utils/createReducer'

export const SPOTIFY_TRACKS_FETCH = 'spotify/TRACKS_FETCH'
export const SPOTIFY_TRACKS_FETCH_FAILURE = 'spotify/TRACKS_FETCH_FAILURE'
export const SPOTIFY_TRACKS_FETCH_SUCCESS = 'spotify/TRACKS_FETCH_SUCCESS'
export const SPOTIFY_TRACKS_RESET = 'spotify/TRACKS_RESET'
export const SPOTIFY_ARTISTS_FETCH = 'spotify/ARTISTS_FETCH'
export const SPOTIFY_ARTISTS_FETCH_FAILURE = 'spotify/ARTISTS_FETCH_FAILURE'
export const SPOTIFY_ARTISTS_FETCH_SUCCESS = 'spotify/ARTISTS_FETCH_SUCCESS'
export const SPOTIFY_ARTISTS_RESET = 'spotify/ARTISTS_RESET'
export const SPOTIFY_TIME_RANGE_SET = 'spotify/TIME_RANGE_SET'
export const SPOTIFY_SELECTED_LIST_SET = 'spotify/SELECTED_LIST_SET'

interface SpotifyArtist {
  id: string
  name: string
  genres: string[]
  followers: {
    total: number
  }
  images: {
    url: string
    height: number
    width: number
  }[]
  popularity: number
}

interface SpotifyTrack {
  id: string
  album: Record<string, unknown>,
  artist: SpotifyArtist[],
  name: string,
}

export interface SpotifyInitialState {
  tracks: {
    items: SpotifyTrack[]
    limit: number
    offset: number
  }
  artists: {
    items: SpotifyArtist[]
    limit: number
    offset: number
  }
  selectedList: 'track' | 'artist'
  timeRange: 'short_term' | 'medium_term' | 'long_term'
  isLoading: boolean
  isError: boolean
}

const INITIAL_STATE: SpotifyInitialState = {
  tracks: {
    items: [],
    limit: 0,
    offset: 0,
  },
  artists: {
    items: [],
    limit: 0,
    offset: 0,
  },
  selectedList: 'track',
  timeRange: 'short_term',
  isLoading: false,
  isError: false,
}

export default createReducer(INITIAL_STATE, {
  [SPOTIFY_TRACKS_FETCH]: (state) => {
    state.isLoading = true
  },
  [SPOTIFY_TRACKS_FETCH_FAILURE]: (state) => {
    state.isLoading = false
    state.isError = true
  },
  [SPOTIFY_TRACKS_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.isError = false
    state.tracks = action.payload
  },
  [SPOTIFY_TRACKS_RESET]: (state) => {
    state.tracks = { ...INITIAL_STATE.tracks }
  },
  [SPOTIFY_ARTISTS_FETCH]: (state) => {
    state.isLoading = true
  },
  [SPOTIFY_ARTISTS_FETCH_FAILURE]: (state) => {
    state.isLoading = false
    state.isError = true
  },
  [SPOTIFY_ARTISTS_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.isError = false
    state.artists = action.payload
  },
  [SPOTIFY_TIME_RANGE_SET]: (state, action) => {
    state.timeRange = action.payload
  },
  [SPOTIFY_SELECTED_LIST_SET]: (state, action) => {
    state.selectedList = action.payload
  },
  [SPOTIFY_ARTISTS_RESET]: (state) => {
    state.artists = { ...INITIAL_STATE.artists }
  },
})

export const spotifyTracksFetch = () => ({
  type: SPOTIFY_TRACKS_FETCH,
})
export const spotifyTracksFetchFailure = () => ({
  type: SPOTIFY_TRACKS_FETCH_FAILURE,
})
export const spotifyTracksFetchSuccess = (data: SpotifyInitialState['tracks']) => ({
  type: SPOTIFY_TRACKS_FETCH_SUCCESS,
  payload: data
})
export const spotifyTracksReset = () => ({
  type: SPOTIFY_TRACKS_RESET,
})
export const spotifyArtistsFetch = () => ({
  type: SPOTIFY_ARTISTS_FETCH,
})
export const spotifyArtistsFetchFailure = () => ({
  type: SPOTIFY_ARTISTS_FETCH_FAILURE,
})
export const spotifyArtistsFetchSuccess = (data: SpotifyInitialState['tracks']) => ({
  type: SPOTIFY_ARTISTS_FETCH_SUCCESS,
  payload: data
})
export const spotifyArtistsReset = () => ({
  type: SPOTIFY_ARTISTS_RESET,
})
export const spotifyTimeRangeSet = (timeRange: SpotifyInitialState['timeRange']) => ({
  type: SPOTIFY_TIME_RANGE_SET,
  payload: timeRange
})
export const spotifySelectedListSet = (value: SpotifyInitialState['selectedList']) => ({
  type: SPOTIFY_SELECTED_LIST_SET,
  payload: value
})