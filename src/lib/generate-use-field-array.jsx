import { Button } from '@headlessui/react'
import React from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import GenerateField from './generate-field'

const GenerateUseFieldArray = ({ control, name, fieldsApi }) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })
  console.log(fields)
  return (
    <div>
      <p>{name}</p>
      {fields.map((item, index) => {
        return (
          <li key={item.id} className='flex flex-col'>
            {fieldsApi.map((field) => (
              <Controller
                key={`${name}.${index}.${field.description}`}
                name={`${name}.${index}.${field.description}`}
                control={control}
                render={({ field: inputField }) => (
                  <GenerateField
                    type={field.type}
                    description={field.description}
                    field={inputField}
                    options={field?.options}
                  />
                )}
              />
            ))}
          </li>
        )
      })}
      <Button onClick={append}>+</Button>
      <Button onClick={remove}>-</Button>
    </div>
  )
}

export default GenerateUseFieldArray
