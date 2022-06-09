import axios from 'axios'
import querystring from 'query-string'
import type { NextApiRequest, NextApiResponse } from 'next'

import config from 'config'
import { parseCookie } from 'utils/cookie'

const {
  spotifyAuthUrl,
  spotifyRedirectUrl,
  spotifyClientId,
  spotifyClientSecret,
} = config

const handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const code = req.query.code || null
  const state = req.query.state || null

  if (state === null) {
    res.redirect(`/#${querystring.stringify({
      error: 'state_mismatch'
    })}`)
  } else {
    const formData = querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: spotifyRedirectUrl,
    })
    axios({
      method: 'post',
      url: `${spotifyAuthUrl}/api/token`,
      data: formData,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      const { data, status } = response
      if (status === 200) {
        const cookies = req.headers.cookie || ''
        const parsedCookies = parseCookie(cookies)
        const { loginRedirect } = parsedCookies
        res.redirect(`${loginRedirect}?${querystring.stringify(data)}`)
      } else {
        console.log('error')
        res.status(500).json({ message: 'Internal server error' })
      }
    }).catch((error) => {
      console.log(error)
      res.status(500).json(error)
    })
  }
}

export default handler