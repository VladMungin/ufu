import React from 'react'

export function Footer() {
  return (
    <footer className="bg-white py-4 font-bold text-xl gap-5 shadow-[0px_0px_16px_0px_#95A1FF33] mx-auto rounded-b-[20px] w-full rounded-t-[20px] mt-6 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <span className="flex text-[#c4c4FF] font-normal text-xs tracking-[0.4px]">
            ЮрТехник <br className="block md:hidden" /> © Все права <br className="block md:hidden" /> защищены. 2024
          </span>
          <span className="flex text-[#c4c4FF] font-normal text-xs tracking-[0.4px] text-right md:text-left items-end ">
            Политика <br className="block md:hidden" /> конфиденциальности
          </span>
        </div>
      </div>
    </footer>
  )
}
