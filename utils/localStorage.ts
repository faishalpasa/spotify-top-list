export const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || ''
  }
  return null
}

export const setItem = (key: string, data: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, data)
  }
  return null
}

export const removeItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(key)
  }
  return null
}
