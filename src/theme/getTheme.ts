import { createTheme } from '@mui/material'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: { main: '#1de9b6', contrastText: '#000', dark: '#00b686' },
            secondary: { main: '#ff4081', contrastText: '#fff' },
            background: { default: '#121212', paper: '#1e1e1e' },
            text: { primary: '#e0e0e0', secondary: '#bdbdbd' },
            divider: 'rgba(255,255,255,0.12)',
          }
        : {
            primary: {
              main: '#2C7BE5',
              contrastText: '#fff',
              dark: '#1A5BB8',
            },
            secondary: {
              main: '#FF6B6B',
              contrastText: '#fff',
            },
            background: {
              default: '#fdfdfd',
              paper: '#ffffff',
            },
            text: {
              primary: '#1F2937',
              secondary: '#6B7280',
            },
            divider: 'rgba(0,0,0,0.1)',
          }),
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
    },
    shape: {
      borderRadius: 4,
    },
  })
