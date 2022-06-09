import { ajax } from 'rxjs/ajax'
import UrlPattern from 'url-pattern'

import config from 'config'

import type { Endpoint } from 'constants/endpoints'

const { apiUrl } = config

// eslint-disable-next-line default-param-last
const generatePath = (path: string, params = {}, query?: Record<string, unknown>): string => {
  const url = new UrlPattern(path).stringify(params)

  if (typeof query === 'object') {
    const queryString = Object.entries(query)
      .filter(([, val]) => {
        if (val === null || val === undefined || val === '') {
          return false
        }
        return true
      })
      .map(([key, val]) => `${key}=${val}`)
      .join('&')

    return `${url}?${queryString}`
  }
  return url
}

interface Options {
  endpoint: Endpoint
  host?: string
  headers?: Record<string, unknown>
  params?: Record<string, unknown>
  query?: Record<string, unknown>
  body?: Record<string, unknown>
}

const api = (options: Options) => {
  const {
    endpoint,
    host,
    headers,
    params = {},
    query,
    body,
  } = options
  const [method, path] = endpoint

  const hostName = host ?? apiUrl

  const generatedPath = generatePath(path, params, query)
  const url = `${hostName}/${generatedPath}`

  return ajax({
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    createXHR: () => new XMLHttpRequest(),
    url,
    body,
  })
}

export default api
