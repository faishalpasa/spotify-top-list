import axios from 'axios'
// import querystring from 'query-string'
import type { NextApiRequest, NextApiResponse } from 'next'

// import config from 'config'

// const {
//   spotifyAuthUrl,
//   spotifyRedirectUrl,
//   spotifyClientId,
//   spotifyClientSecret,
// } = config

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  axios({
    method: 'get',
    url: 'https://629d5907c6ef9335c09c0ee7.mockapi.io/api/v1/news/1/comments',
  }).then((response) => {
    const { data, status } = response

    if (status === 200) {
      res.status(200).json(data)
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }).catch((error) => {
    res.status(500).json(error.message)
  })
}

export default handler