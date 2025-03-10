import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white py-4 font-bold text-xl gap-5 shadow-[0px_0px_16px_0px_#95A1FF33] mx-auto rounded-b-[20px]">
      <Link to="/" className="hover:no-underline hover:text-black">
        <div className="max-w-[1920px] mx-auto flex w-full justify-center ">
          <img src="/logo.svg" alt="" />
          <h1 className="block ml-2 ">Конструктор документов</h1>
        </div>
      </Link>
    </header>
  )
}

export default Header

// box-shadow: 0px 0px 16px 0px #95A1FF33;
