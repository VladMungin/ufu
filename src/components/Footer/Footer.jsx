import React from 'react'

export function Footer() {
  return (
    <footer className="bg-white py-4 font-bold text-xl gap-5 shadow-[0px_0px_16px_0px_#95A1FF33] mx-auto rounded-b-[20px] w-full rounded-t-[20px] shadow-[0px_0px_16px_0px_#95A1FF33] mt-6">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <span className="flex text-[#c4c4FF] font-normal text-xs tracking-[0.4px]">
            Ваша компания © Все права защищены. 2024
          </span>
          <span className="flex text-[#c4c4FF] font-normal text-xs tracking-[0.4px]">Политика конфиденциальности</span>
        </div>
      </div>
    </footer>
  )
}
