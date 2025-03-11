import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const { pathname } = useLocation()
  return (
    <header className="bg-white py-4 font-bold text-xl gap-5 shadow-[0px_0px_16px_0px_#95A1FF33] mx-auto rounded-b-[20px] w-full ">
      <div className="container mx-auto">
        {pathname !== '/' && (
          <Link to="/" className="hover:no-underline hover:text-black">
            <div className="max-w-[1920px] mx-auto flex w-full justify-center ">
              <img src="/logo.svg" alt="" />
              <h1 className="block ml-2 font-bold text-xl tracking-[0.15px]">ЮрТехник</h1>
            </div>
          </Link>
        )}
        {pathname === '/' && (
          <div className="px-16 flex w-full justify-between items-center ">
            <Link to="/" className="hover:no-underline hover:text-black flex">
              <img src="/logo.svg" alt="" />
              <h1 className="block ml-2 font-bold text-xl tracking-[0.15px]">ЮрТехник</h1>
            </Link>
            <div className="flex gap-2">
              <Link
                className="rounded-2xl border hover:border-[#C4C4FF] hover:no-underline hover:text-[#5c5cFF] text-[#5c5cFF] px-3.5 py-1.5 font-medium shadow-[0px_0px_16px_0px_#95A1FF33] transition-all hover:shadow-none text-sm tracking-[0.1px]"
                to="/register"
              >
                Зарегистрироваться
              </Link>
              <Link
                className="rounded-2xl border hover:border-[#C4C4FF] hover:no-underline hover:text-[#1b1b1e] text-[#5c5cFF] px-3.5 py-1.5 font-medium shadow-[0px_0px_16px_0px_#95A1FF33] transition-all hover:shadow-none text-sm tracking-[0.1px]"
                to="/login"
              >
                Войти
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
