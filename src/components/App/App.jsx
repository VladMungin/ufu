import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import { CookiesProvider } from 'react-cookie'
import AppRoutes from '../../Routes/Routes'
import BG from '../BG/BG'
import Header from '../Header/Header'
import './App.css'

function App() {
  const queryClient = new QueryClient()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <div className="relative mx-auto max-w-[1920px]">
              <Header />
              <BG />
              <AppRoutes />
            </div>
          </QueryClientProvider>
        </Provider>
      </CookiesProvider>
    </LocalizationProvider>
  )
}

export default App
