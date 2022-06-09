import React, { useState, useEffect, memo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Box,
  Typography,
  Snackbar,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material'
import { 
  Close as CloseIcon,
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material'
import type { NextPage } from 'next'
import Head from 'next/head'

import config from 'config'
import SpotifyLogin from 'components/SpotifyLogin'
import SpotifyCard from 'components/SpotifyCard'
import { authCheck } from 'redux/reducers/auth'
import { snackbarClose } from 'redux/reducers/snackbar'
import { spotifyTracksFetch, spotifyArtistsFetch, spotifyTimeRangeSet } from 'redux/reducers/spotify'
import styles from 'styles/Home.module.css'

import type { RootState } from 'redux/rootReducer'

const homeSelector = ({ auth, spotify, snackbar }: RootState) => ({
  auth,
  spotify,
  snackbar,
})

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const { auth, snackbar, spotify } = useSelector(homeSelector, shallowEqual)
  const [listTabValue, setListTabValue] = useState('artist')

  const handleSnackbarClose = () => dispatch(snackbarClose())

  const handleChangeListTab = (e: React.SyntheticEvent, newValue: string) => {
    setListTabValue(newValue)
  }

  const handleChangeTimeRangeTab = (e: React.SyntheticEvent, newValue: string) => {
    dispatch(spotifyTimeRangeSet(newValue))
    dispatch(spotifyTracksFetch())
    dispatch(spotifyArtistsFetch())
  }

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
        {auth.data.accessToken && (
          <>
            <Typography
              component="h1"
              sx={{
                textAlign: "center",
                fontSize: { xs: '2rem', md: '4rem' },
              }}
            >
              {config.appName}
            </Typography>
            <Tabs
              value={spotify.timeRange} 
              onChange={handleChangeTimeRangeTab} 
              centered 
              TabIndicatorProps={{
                style: {
                    display: "none",
                },
              }}
            >
              <Tab label="This Month" value="short_term" />
              <Tab label="Six Months" value="medium_term" />
              <Tab label="This Year" value="long_term" />
            </Tabs>
          </>
        )}
        <Box display="flex" justifyContent="center" mb={4} gap={4}>
          {auth.data.accessToken  ? (
            <Box display="flex" flexDirection="column">
              <Tabs value={listTabValue} onChange={handleChangeListTab} centered>
                <Tab label="Artist" value="artist" />
                <Tab label="Track" value="track" />
              </Tabs>
              {listTabValue === 'artist' && (
                <SpotifyCard
                  items={spotify.artists.items}
                  type="artist"
                />
              )}
              {listTabValue === 'track' && (
                <SpotifyCard
                  items={spotify.tracks.items}
                  type="track"
                /> 
              )}
            </Box>
          ) : (
            <Box textAlign="center" sx={{ marginTop: '30vh' }}>
              <Typography
                component="h1"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: '2rem', md: '3rem' },
                  marginBottom: 2
                }}
              >
                {config.appName}
              </Typography>
              <SpotifyLogin />
            </Box>
          )
        }
        </Box>
      </Box>

      <Box component="footer" display="flex" flexDirection="column" textAlign="center">
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <a href="https://github.com/faishalpasa" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </a>
          <a href="https://instagram.com/faishalpasa" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
        </Box>
        <Typography variant="body2" component="h3">
          {new Date().getFullYear()} © Uje
        </Typography>
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
