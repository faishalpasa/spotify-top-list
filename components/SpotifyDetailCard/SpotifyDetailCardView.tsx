import React from 'react'
import { 
  Box,
  Button,
  Dialog,
  DialogContent,
  Slide,
  Typography,
} from '@mui/material'
import {
  Launch as LaunchIcon,
} from '@mui/icons-material'
import { TransitionProps } from '@mui/material/transitions'
import Image from 'next/image'

// import classes from './Vinyl.module.css'

export interface SpotifyDetailDataProps {
  type: string
  name: string
  artist: {
    name: string
    spotifyUrl: string
  }
  genres: string[]
  imgUrl: string
  spotifyUrl: string
  album: {
    name?: string,
    releaseDate?: string,
    imageUrl?: string,
    spotifyUrl?: string,
  }
}

interface SpotifyDetailCardProps {
  isOpen: boolean
  onClose: () => void
  data: SpotifyDetailDataProps
}

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />)

const openUrl = (url: string) => {
  window.open(url, '_blank')
}

const SpotifyDetailCardView = ({
  isOpen,
  onClose,
  data,
}: SpotifyDetailCardProps) => (
  <Dialog
    open={isOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    fullWidth
    maxWidth="sm"
  >
    <DialogContent sx={{ backgroundColor: '#181818' }}>
      <Box width="100%" position="relative" sx={{ aspectRatio: '1/1' }}>
        {data.imgUrl && (
          <Image
            src={data.imgUrl}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </Box>
      <Box textAlign="center" my={2}>
        <Typography color="white" variant="h5" component="h2">
          {data.name}
        </Typography>
        {data.artist.name && (
          <Typography color="white" component="h3">
            {data.artist?.name}
            &nbsp;
            {data.artist.spotifyUrl && (
              <LaunchIcon
                sx={{ fontSize: '12px'}}
                color="success"
                onClick={() => openUrl(data.artist.spotifyUrl)}
              />
            )}
          </Typography>
        )}

        {data.album.name && (
          <Typography color="white" component="h3">
            {data.album?.name}
            &nbsp;
            {data.album.spotifyUrl && (
              <LaunchIcon
                sx={{ fontSize: '12px'}}
                color="success"
                onClick={() => openUrl(data.album.spotifyUrl as string)}
              />
            )}
          </Typography>
        )}

        {data.genres && (
          <Typography color="white" component="h3">
            {data.genres.join(', ')}
          </Typography>
        )}
      </Box>
      <Box textAlign="center">
        <Button
          fullWidth
          variant="contained"
          onClick={() => openUrl(data.spotifyUrl)}
          color="success"
        >
          Play on Spotify
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
)

export default SpotifyDetailCardView