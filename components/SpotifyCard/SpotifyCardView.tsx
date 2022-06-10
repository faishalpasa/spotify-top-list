import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import truncate from 'lodash.truncate'

import {
  spotifyTracksFetch,
  spotifyArtistsFetch,
  spotifyTimeRangeSet,
  spotifySelectedListSet,
} from 'redux/reducers/spotify'
import type { RootState } from 'redux/rootReducer'
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

const position: Record<number, string> = {
  1: '#c7c616',
  2: '#737373',
  3: '#603b0a'
}

const spotifyCardSelector = ({ spotify }: RootState) => ({ spotify })

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
}: SpotifyCardProps) => {
  const dispatch = useDispatch()
  const { spotify } = useSelector(spotifyCardSelector, shallowEqual)

  const handleChangeList = (newValue: 'track' | 'artist') => {
    dispatch(spotifySelectedListSet(newValue))
  }

  const handleChangeTimeRange = () => {
    let newValue = spotify.timeRange
    if (newValue === 'short_term') {
      newValue = 'medium_term'
    } else if (newValue === 'medium_term') {
      newValue = 'long_term'
    } else {
      newValue = 'short_term'
    }
    dispatch(spotifyTimeRangeSet(newValue))
    dispatch(spotifyTracksFetch())
    dispatch(spotifyArtistsFetch())
  }

  let rangeLabel = 'This Week'
  if (spotify.timeRange === 'medium_term') {
    rangeLabel = 'This Month'
  } else if (spotify.timeRange === 'long_term') {
    rangeLabel = 'This Year'
  } else {
    rangeLabel = 'This Week'
  }

  return(
    <Box display="flex" flexDirection="column" flex={1} gap={1}>
      <Box textAlign="center" display="flex" flexDirection="column" gap={1} flex={1}>
        {items.map((item, index) => {
          const imgUrl = type === 'artist' 
            ? item.images?.[0].url
            : item.album.images?.[0].url
          return(
            <Box key={item.id} className={classes.cardItem} boxShadow={4}>
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
              <div className={classes.numberBadge} style={{ borderTopColor: position[index + 1] }} />
              <Typography
                className={`${classes.cardItemText} ${classes.textNumberPosition}`}
                variant="body2"
              >
                {index + 1}
              </Typography>
              <Typography
                className={`${classes.cardItemText} ${classes.textItemName}`}
                variant="body2"
              >
                {truncate(item.name, { length: 35 })}
                <Typography component="small" sx={{ fontSize: '8px' }}>{item.artists?.[0].name}</Typography>
              </Typography>
            </Box>
          )
        })}
      </Box>
      <div className={classes.bottomWrapper}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" flexDirection="row">
            <Button
              className={`
                ${classes.buttonChangeList} ${spotify.selectedList === 'track' ? classes.buttonChangeListDisabled : ''}
              `}
              onClick={() => handleChangeList('track')}
              variant="contained"
              size="small"
              color="success"
            >
              Track
            </Button>
            <Button
              className={`
                ${classes.buttonChangeList} ${spotify.selectedList === 'artist' ? classes.buttonChangeListDisabled : ''}
              `}
              onClick={() => handleChangeList('artist')}
              variant="contained"
              size="small"
              color="success"
              data-disabled={spotify.selectedList === 'artist'}
            >
              Artist
            </Button>
          </Box>
          <Button
            className={classes.buttonChangeList}
            onClick={handleChangeTimeRange}
            variant="contained"
            size="small"
            color="success"
          >
            {rangeLabel}
          </Button>
        </Box>
      </div>
    </Box>
  )
}

export default SpotifyCardView