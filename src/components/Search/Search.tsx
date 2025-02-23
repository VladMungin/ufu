import { SearchOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { querySuggestDocuments } from '../../api/api'
import './style.css'

const Search = () => {
  const { control, watch, handleSubmit } = useForm<{ 'doc-name': string }>()
  const isDisabled = !watch('doc-name')

  const { mutateAsync } = useMutation({
    mutationFn: querySuggestDocuments,
    mutationKey: ['doc-name'],
  })

  const onSubmit = (data: { 'doc-name': string }) => {
    const res = mutateAsync(data['doc-name'])
    console.log(res)
  }
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
    </div>
  )
}

export default Search
