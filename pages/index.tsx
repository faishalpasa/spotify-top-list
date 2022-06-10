import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Box,
  Typography,
  Snackbar,
  IconButton,
} from '@mui/material'
import { 
  Close as CloseIcon,
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import config from 'config'
import SpotifyLogin from 'components/SpotifyLogin'
import SpotifyCard from 'components/SpotifyCard'
import Vinyl from 'components/Vinyl'
import { authCheck } from 'redux/reducers/auth'
import { snackbarClose } from 'redux/reducers/snackbar'
import {
  spotifyTracksFetch,
  spotifyArtistsFetch,
} from 'redux/reducers/spotify'

import type { RootState } from 'redux/rootReducer'

const homeSelector = ({ auth, spotify, snackbar }: RootState) => ({
  auth,
  spotify,
  snackbar,
})

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const { auth, snackbar, spotify } = useSelector(homeSelector, shallowEqual)

  const handleSnackbarClose = () => dispatch(snackbarClose())

  useEffect(() => {
    dispatch(authCheck())
  }, [dispatch])

  useEffect(() => {
    if (auth.data.accessToken) {
      dispatch(spotifyTracksFetch())
      dispatch(spotifyArtistsFetch())
    }
  }, [auth.data.accessToken, dispatch])

  return (
    <Box px={1} height="100vh" overflow="hidden" position="relative">
      <Head>
        <title>{config.appName}</title>
        <meta name="description" content={config.appName} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        component="main"
        sx={{
          maxWidth: 'sm',
          margin: 'auto',
          height: '100%'
        }}
      >
        <Box display="flex" justifyContent="center" my={1} gap={4} width="100%" height="100%">
          {auth.data.accessToken  ? (
            <>
              {spotify.selectedList === 'track' && (
                <SpotifyCard
                  items={spotify.tracks.items}
                  type="track"
                /> 
              )}
              {spotify.selectedList === 'artist' && (
                <SpotifyCard
                  items={spotify.artists.items}
                  type="artist"
                />
              )}
            </>
          ) : (
            <Box textAlign="center" marginTop="30vh">
              <Box position="relative" width="100px" height="100px" margin="auto">
                <Image
                  src="/images/spotify-logo.png"
                  alt="spotify"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </Box>

              <Typography
                component="h1"
                sx={{
                  textAlign: "center",
                  fontSize: '2rem',
                  marginBottom: 2,
                  color: '#fff',
                }}
              >
                {config.appName}
              </Typography>

              <SpotifyLogin />

              <Box
                component="footer"
                display="flex"
                flexDirection="column"
                textAlign="center"
                marginTop={2}
              >
                <Box display="flex" alignItems="center" justifyContent="center" gap={2} color="#fff">
                  <a href="https://github.com/faishalpasa" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon color='inherit' />
                  </a>
                  <a href="https://instagram.com/faishalpasa" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon color='inherit' />
                  </a>
                </Box>
                <Typography variant="body2" component="h3" color="#fff">
                  {new Date().getFullYear()} © Uje
                </Typography>
              </Box>
            </Box>
          )
        }
        </Box>
      </Box>

      {auth.data.accessToken && <Vinyl />}

      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={snackbar.duration}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={(
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      />
    </Box>
  )
}

export default memo(Home)
