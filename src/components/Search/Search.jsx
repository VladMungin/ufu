import { SearchOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { querySuggestDocuments } from '../../api/api'
import './style.css'

const Search = () => {
  const { control, watch, handleSubmit } = useForm()
  const isDisabled = !watch('doc-name')

  const { mutateAsync, data: searchedDocument } = useMutation({
    mutationFn: querySuggestDocuments,
    mutationKey: ['doc-name'],
  })

  const onSubmit = (data) => {
    const res = mutateAsync(data['doc-name'])
  }
  console.log(searchedDocument)
  return (
    <div className="max-w-[1920px] mx-auto px-[68px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-[1112px] mt-[138px]">
        <h1 className="text-[#5C5CFF] text-[48px] font-bold">Конструктор документов</h1>
        <div className="flex gap-x-4 mt-5 pt-5">
          <Controller
            name="doc-name"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type="text"
                  addonBefore={<SearchOutlined />}
                  placeholder="Введите запрос"
                  variant="borderless"
                  className="ant-input-search-page"
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
          <div className="flex flex-col gap-3 mt-3">
            {searchedDocument &&
              searchedDocument.map((document) => (
                <Link
                  key={document.id}
                  to={`/constructor?document_id=${document.id}`}
                  className="flex gap-1.5 bg-white rounded-2xl shadow-[0px_0px_16px_0px_#95A1FF33] pl-3 pt-4 pb-4"
                >
                  <img src="/note_alt.svg" />
                  {document.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
