import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { Provider } from 'react-redux'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import createEmotionCache from 'utils/emotion'
import muiTheme from 'styles/theme/mui'
import { store } from 'redux/store'
import 'styles/globals.css'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache()

const lightTheme = createTheme(muiTheme)

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  
  // workaround solution for component flickering
  // https://github.com/mui/material-ui/issues/32807#issuecomment-1129332169
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  useEffect(() => {
    setIsComponentMounted(true)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Provider store={store}>
          {isComponentMounted && <Component {...pageProps} />}
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp