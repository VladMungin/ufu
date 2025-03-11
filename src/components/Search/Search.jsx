import SearchIcon from '@mui/icons-material/Search'
import { Input, InputAdornment } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { querySuggestDocuments } from '../../api/api'
import { splitStringByNumber } from '../../helpers/splitStringByNumber'
import './style.css'
const Search = () => {
  const { control, watch, handleSubmit } = useForm()
  const isDisabled = !watch('doc-name')

  const { mutateAsync, data: searchedDocument } = useMutation({
    mutationFn: querySuggestDocuments,
    mutationKey: ['doc-name'],
  })

  const onSubmit = (data) => {
    mutateAsync(data['doc-name'])
  }
  return (
    <div className="max-w-[1920px] mx-auto px-[68px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-[1112px] ">
        <h1 className="text-[#5C5CFF] text-[48px] font-bold">Конструктор документов</h1>
        <div className="flex gap-x-4 mt-5 pt-5 items-center">
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
                  className="w-full px-3 py-3.5 border border-[#CCC2DC] rounded-xl focus:border-[#CCC2DC] focus:outline-none"
                />
              )
            }}
          />
          <Button
            className="search-button"
            disabled={isDisabled}
            onClick={() => {
              onSubmit({ 'doc-name': watch('doc-name') })
            }}
          >
            Искать
          </Button>
        </div>
      </form>
      {searchedDocument && (
        <div className="flex flex-col mt-9">
          <div className="text-[#5C5CFF] text-xl">Скорей всего, вам подойдет этот тип документа:</div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {searchedDocument &&
              searchedDocument.map((document) => (
                <Link
                  key={document.id}
                  to={`/constructor?document_id=${document.id}`}
                  className="flex gap-1.5 bg-white rounded-2xl shadow-[0px_0px_16px_0px_#95A1FF33] pl-3 pt-4 pb-4"
                >
                  {/* <img src="/note_alt.svg" /> */}
                  <div className="flex flex-col gap-4 ">
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
