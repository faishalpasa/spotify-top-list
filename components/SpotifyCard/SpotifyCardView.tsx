import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import classes from './SpotifyCard.module.css'

const shimmer = (width: number | string, height: number | string) => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#333" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) => typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

interface SpotifyCardProps {
  items: {
    id: string
    name: string
    images?: any
    album?: any
    artists?: any
  }[]
  type: 'track' | 'artist'
}

const SpotifyCardView = ({
  items,
  type,
}: SpotifyCardProps) => (
    <Box display="flex" flexDirection="column" flex={1} gap={1}>
      <Box textAlign="center" display="flex" flexDirection="column" gap={1} height="70vh">
        {items.map((item) => {
          const imgUrl = type === 'artist' 
            ? item.images?.[0].url
            : item.album.images?.[0].url
          return(
          <Box key={item.id} className={classes.cardItem}>
            <Image
              src={imgUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              priority
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer('100%', '50px'))}`}
              className={classes.cardImage}
            />
            <div className={classes.cardImageOverlay} />
            <Typography
              className={classes.cardItemText}
              variant="body2"
            >
              {item.name}
            </Typography>
          </Box>
        )})}
      </Box>
      <Box height="30vh" bgcolor="#000" />
    </Box>
  )

export default SpotifyCardView