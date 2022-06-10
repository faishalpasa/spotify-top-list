import React from 'react'
import { Box } from '@mui/material'

import classes from './Vinyl.module.css'

const VinylView = () => (
  <Box className={classes.vinylWrapper} sx={{ maxWidth: 'sm' }}>
    <img src='/images/vinyl.png' alt='vinyl' className={classes.vinylImage} />
    <div className={classes.vinylImageOverlay} />
  </Box>
)

export default VinylView