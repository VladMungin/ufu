import { Button } from '@headlessui/react'
import cn from 'classnames'
import React from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import GenerateField from './generate-field'
const GenerateUseFieldArray = ({ control, name, fieldsApi }) => {
  const { fields, append, remove } = useFieldArray({
    name: name.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', ''),
    control,
  })
  return (
    <div className="flex flex-col items-center">
      {fields.map((item, index) => {
        return (
          <li key={item.id} className="flex flex-col">
            <p className={cn('text-base font-bold  my-2 pt-2 px-5')}>{name}</p>
            {fieldsApi.map((field) => {
              return (
                <Controller
                  key={`${name.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', '')}.${index}.${field.description.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', '')}`}
                  name={`${name.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', '')}.${index}.${field.description.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', '')}`}
                  control={control}
                  render={({ field: inputField }) => (
                    <GenerateField
                      type={field.type}
                      description={field.description}
                      tooltip={field.tooltip}
                      field={inputField}
                      options={field?.options}
                    />
                  )}
                />
              )
            })}
            <p
              className={cn('text-base font-bold  my-2 pt-2 px-5', {
                'border-b border-[#CCC2DC]  ': true,
              })}
            >
              <Button
                className="bg-[#CCC2DC] py-4  text-[#FFF] tracking-[0.1px] font-semibold text-base rounded-xl shadow-[0px_0px_16px_0px_#95A1FF33] px-4 mb-4 hover:scale-105 transition-all duration-300"
                onClick={() => remove(index)}
              >
                Удалить
              </Button>
            </p>
          </li>
        )
      })}
      <Button
        className="bg-[#0000F5] py-4  text-[#FFF] tracking-[0.1px] font-semibold text-base rounded-xl shadow-[0px_0px_16px_0px_#95A1FF33] mx-auto w-[95%] hover:bg-[#5C5CFF] transition-all duration-300"
        onClick={append}
      >
        Добавить
      </Button>
    </div>
  )
}

export default GenerateUseFieldArray
