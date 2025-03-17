import React from 'react'

const LastStep = () => {
  return (
    <div className="h-full px-5">
      <h3 className="text-xl text-[#5C5CFF] mb-3">Готово!</h3>
      <p className="text-[#5C5CFF] mb-4">Вы сформировали документ в формате .docx</p>
      <div className="mx-auto max-w-max shadow-[0px_0px_16px_0px_#95A1FF33] rounded-[36px] p-7">
        <img src="/docx.png" alt="" className="size-[184px] object-cover " />
      </div>
    </div>
  )
}

export default LastStep
