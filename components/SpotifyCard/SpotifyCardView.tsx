import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

interface SpotifyCardProps {
  items: {
    id: string
    name: string
    images?: any
    album?: any
  }[]
  title: string
  type: 'track' | 'artist'
}

const SpotifyCardView = ({
  items,
  title,
  type,
}: SpotifyCardProps) => (
    <Box flex={1} textAlign="center">
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      {items.map((item) => {
        const imgUrl = type === 'artist' 
          ? item.images?.[0].url
          : item.album.images?.[0].url
        return(
        <Box key={item.id} display="flex" flexDirection="column" alignItems="center" my={2}>
          <Image src={imgUrl} alt={item.name} width={200} height={200} />
          {item.name}
        </Box>
      )})}
    </Box>
  )

export default SpotifyCardView