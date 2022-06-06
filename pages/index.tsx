import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Box,
  Typography, 
  Divider,
  Snackbar,
  IconButton,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import type { NextPage } from 'next'
import Head from 'next/head'

import BasicComponent from 'components/Basic'
import ObservableComponent from 'components/Observable'
import { snackbarClose } from 'redux/reducers/snackbar'
import styles from 'styles/Home.module.css'

import { indexSelector } from './indexSelector'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const { snackbar } = useSelector(indexSelector, shallowEqual)

  const handleSnackbarClose = () => dispatch(snackbarClose())

  return (
  <div className={styles.container}>
    <Head>
      <title>Redux-Observable</title>
      <meta name="description" content="Redux-Observable" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Box component="main">
      <Typography component="h1" className={styles.title}>
        Redux-Observable
      </Typography>
      <Box display="flex" mb={4} mt={4} gap={4}>
        <BasicComponent />
        <ObservableComponent />
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

export default Home
