import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Box,
  Typography,
  Snackbar,
  IconButton,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import type { NextPage } from 'next'
import Head from 'next/head'

import config from 'config'
import SpotifyLogin from 'components/SpotifyLogin'
import SpotifyCard from 'components/SpotifyCard'
import { authCheck } from 'redux/reducers/auth'
import { snackbarClose } from 'redux/reducers/snackbar'
import { spotifyTracksFetch, spotifyArtistsFetch } from 'redux/reducers/spotify'
import styles from 'styles/Home.module.css'

import { indexSelector } from './indexSelector'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const { auth, snackbar, spotify } = useSelector(indexSelector, shallowEqual)

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
    <div className={styles.container}>
      <Head>
        <title>{config.appName}</title>
        <meta name="description" content={config.appName} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box component="main">
        <Typography component="h1" className={styles.title}>
          {config.appName}
        </Typography>
        <Box display="flex" justifyContent="center" mb={4} mt={4} gap={4}>
          {auth.data.accessToken 

          ? (
            <Box display="flex" flex={1}>
              <SpotifyCard
                items={spotify.artists.items}
                title="Top Artists"
                type="artist"
              />
              <SpotifyCard
                items={spotify.tracks.items}
                title="Top Tracks"
                type="track"
              />
            </Box>
          ) : <SpotifyLogin />
        }
        </Box>
      </Box>

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
    </div>
  )
}

export default memo(Home)
