import { useMemo, useState, useEffect, ReactNode } from 'react'
import {
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  GlobalStyles,
} from '@mui/material'
import { getTheme } from './getTheme'
import { ColorModeContext } from './theme-context'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialMode = (): 'light' | 'dark' => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return prefersDark ? 'dark' : 'light'
  }

  const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode)

  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            'html, body': {
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
            '*': {
              transition:
                'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
            },
          }}
        />

        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  )
}
