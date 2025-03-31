import './index.css'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { ThemeProvider } from './theme/theme-provider.tsx'
import { RouterProvider } from 'react-router'
import router from './router/router.tsx'
const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}
createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
