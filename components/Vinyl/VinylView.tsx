import React, { useState } from 'react'
import { Box } from '@mui/material'

import classes from './Vinyl.module.css'

const VinylView = () => {
  const [isAnimationPause, setIsAnimationPause] = useState(false)
  return (
    <Box
      className={classes.vinylWrapper}
      sx={{ maxWidth: 'sm' }}
      // onTouchStart={() => setIsAnimationPause(true)}
      // onTouchEnd={() => setIsAnimationPause(false)}
      // onMouseDown={() => setIsAnimationPause(true)}
      // onMouseUp={() => setIsAnimationPause(false)}
    >
      <img
        src='/images/vinyl.png'
        alt='vinyl'
        className={classes.vinylImage}
        style={{
          animationPlayState: isAnimationPause ? 'paused' : 'running',
        }}
      />
      <div className={classes.vinylImageOverlay} />
    </Box>
  )
}

export default VinylView