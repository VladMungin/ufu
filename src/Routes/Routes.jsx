import { useCookies } from 'react-cookie'
import { Route, Routes, useLocation } from 'react-router-dom'
import Constructor from '../components/Constructor/Constructor'
import Home from '../components/Home/Home'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import Search from '../components/Search/Search'

const AppRoutes = () => {
  const [cookies] = useCookies(['refresh_token', 'access_token'])
  const location = useLocation()
  const shouldRedirect = !cookies.refresh_token && location.pathname !== '/register' && location.pathname !== '/login'

  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route element={<Register />} path="register" />
      <Route path="/constructor" element={shouldRedirect ? <Navigate replace to="/register" /> : <Constructor />} />
      <Route element={<Login />} path="login" />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}

export default AppRoutes
