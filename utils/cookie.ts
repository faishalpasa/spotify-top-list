export const parseCookie = (string: string) => string
  .split(';')
  .map(v => v.split('='))
  .reduce((acc: Record<string, unknown>, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
    return acc
  }, {})