import { useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from './theme-context'
import type { SxProps, Theme } from '@mui/material'

interface ThemeToggleProps {
  sx?: SxProps<Theme>
  placement?: 'fixed' | 'static'
}

const ThemeToggle = ({ sx = {}, placement = 'fixed' }: ThemeToggleProps) => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const isDark = theme.palette.mode === 'dark'
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        aria-label={label}
        sx={{
          ...(placement === 'fixed' && {
            position: 'fixed',
            top: 0,
            right: 0,
            m: 2,
            zIndex: 10,
            width: 40,
            height: 40,
          }),
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
          borderRadius: '50%',
          transition: 'all 0.3s ease',
          // eslint-disable-next-line @typescript-eslint/no-misused-spread
          ...sx,
        }}
      >
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
