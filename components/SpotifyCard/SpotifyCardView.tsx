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
  type: 'track' | 'artist'
}

const SpotifyCardView = ({
  items,
  type,
}: SpotifyCardProps) => (
    <Box flex={1} textAlign="center">
      {items.map((item) => {
        const imgUrl = type === 'artist' 
          ? item.images?.[0].url
          : item.album.images?.[0].url
        return(
        <Box key={item.id} display="flex" flexDirection="column" alignItems="center" my={2}>
          <Box display="block" sx={{ width: { xs: 300, md: 400 }}}>
            <Image src={imgUrl} alt={item.name} width={200} height={200} layout="responsive" />
          </Box>
          {item.name}
        </Box>
      )})}
    </Box>
  )

export default SpotifyCardView