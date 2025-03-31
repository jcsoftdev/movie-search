import { createContext } from 'react'

interface ColorModeContextType {
  toggleColorMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {
    console.log('toggleColorMode function called')
  },
})
