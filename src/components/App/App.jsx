import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import { CookiesProvider } from 'react-cookie'
import { IntlProvider } from 'react-intl'
import { useLocation } from 'react-router-dom'
import { CustomProvider } from 'rsuite'
import { ruRU } from 'rsuite/esm/locales'
import AppRoutes from '../../Routes/Routes'
import BG from '../BG/BG'
import { Footer } from '../Footer/Footer'
import Header from '../Header/Header'
import './App.css'
function App() {
  const queryClient = new QueryClient()
  const location = useLocation()
  console.log(location)
  return (
    <IntlProvider locale="ru">
      <CustomProvider locale={ruRU}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <Provider>
            <QueryClientProvider client={queryClient}>
              {location.pathname !== '/constructor' && <BG />}
              <div className="flex flex-col min-h-screen justify-between items-start ">
                <Header />
                <div className="relative mx-auto container ">
                  <AppRoutes />
                </div>
                <Footer />
              </div>
            </QueryClientProvider>
          </Provider>
        </CookiesProvider>
      </CustomProvider>
    </IntlProvider>
  )
}

export default App
