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
  const error = req.query.error || null
  const cookies = req.headers.cookie || ''
  const parsedCookies = parseCookie(cookies)
  const { loginRedirect } = parsedCookies

  if (state === null) {
    const errorResponse = {
      error: true,
      message: 'state_mismatch'
    }
    res.redirect(`${loginRedirect}?${querystring.stringify(errorResponse)}`)
  } else if (error) {
    const errorResponse = {
      error: true,
      message: error
    }
    res.redirect(`${loginRedirect}?${querystring.stringify(errorResponse)}`)
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
        res.redirect(`${loginRedirect}?${querystring.stringify(data)}`)
      } else {
        console.log('error')
        const errorResponse = {
          error: true,
          message: data.message
        }
        res.redirect(`${loginRedirect}?${querystring.stringify(errorResponse)}`)
      }
    }).catch((err) => {
      console.log(err)
      const errorResponse = {
        error: true,
        message: err.message
      }
      res.redirect(`${loginRedirect}?${querystring.stringify(errorResponse)}`)
    })
  }
}

export default handler