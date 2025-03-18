import SearchIcon from '@mui/icons-material/Search'
import { Input, InputAdornment } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { querySuggestDocuments } from '../../api/api'
import { splitStringByNumber } from '../../helpers/splitStringByNumber'
import './style.css'
const Search = () => {
  const { control, watch, handleSubmit } = useForm()
  const isDisabled = !watch('doc-name')
  const [error, setError] = useState()
  const { mutateAsync, data: searchedDocument } = useMutation({
    mutationFn: querySuggestDocuments,
    mutationKey: ['doc-name'],
    onError: (error) => {
      setError(error.response.data)
    },
    onSuccess: () => {
      setError(null)
    },
  })

  const onSubmit = (data) => {
    mutateAsync(data['doc-name'])
  }
  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-[68px]">
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col max-w-[1112px] ">
        <h1 className="text-[#5C5CFF] text-[24px] md:text-[48px] font-bold">ЮрТехник</h1>
        <div className="flex gap-x-4 md:mt-5 md:pt-5 items-center flex-col md:flex-row gap-y-3 ">
          <Controller
            name="doc-name"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type="text"
                  // addonBefore={<SearchOutlined />}
                  placeholder="Введите запрос"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  variant="borderless"
                  className="w-full px-3 py-[9px] border border-[#CCC2DC] rounded-xl focus:border-[#CCC2DC] focus:outline-none bg-white"
                  slotProps={{
                    input: {
                      className: '!bg-white',
                    },
                  }}
                />
              )
            }}
          />
          <Button
            className="search-button w-full md:w-auto h-[52px] "
            disabled={isDisabled}
            onClick={() => {
              onSubmit({ 'doc-name': watch('doc-name') })
            }}
          >
            Искать
          </Button>
        </div>
        {error && <p className="mt-4 text-red-600">{error.message}</p>}
      </form>
      {searchedDocument && (
        <div className="flex flex-col mt-9">
          <div className="text-[#5C5CFF] text-xl">Скорей всего, вам подойдет этот тип документа:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            {searchedDocument &&
              searchedDocument.map((document) => (
                <Link
                  key={document.id}
                  to={`/constructor?document_id=${document.id}`}
                  className="flex gap-1.5 bg-white rounded-2xl shadow-[0px_0px_16px_0px_#95A1FF33] pl-3 pt-4 pb-4"
                >
                  {/* <img src="/note_alt.svg" /> */}
                  <div className="flex flex-col gap-4 max-w-[95%]">
                    <h3 className="font-bold leading-6">{document.name}</h3>
                    <span>
                      {document.description &&
                        splitStringByNumber(document.description)?.map((item) => (
                          <li className="list-none" key={item}>
                            {item}
                          </li>
                        ))}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
