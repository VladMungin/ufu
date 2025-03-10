import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex  min-h-[100vh] mx-auto max-w-[1920px]">
      <div
        className="max-w-max mx-4 mt-52 lg:ml-[68px] h-max bg-white shadow-[0px_0px_16px_0px_#95A1FF33] p-[28px] rounded-[36px]
"
      >
        <h1 className="text-[#5C5CFF] text-[48px]">Конструктор документов</h1>
        <p className="max-w-[1200px] text-[24px] leading-[32px] mt-[20px] mb-4">
          Платформа на основе <span className="font-bold">ИИ</span> которая позволяет формировать полноценные
          юридические документы, онлайн без использования стороннего редактора
        </p>
        <Link
          to="/search"
          className="block bg-[#5C5CFF] py-4  text-[#FFF] tracking-[0.1px] font-semibold text-base rounded-2xl shadow-[0px_0px_16px_0px_#95A1FF33] px-6 w-max hover:no-underline hover:text-white hover:scale-105 transition-all duration-300"
        >
          Начать
        </Link>
      </div>
    </div>
  )
}

export default Home
