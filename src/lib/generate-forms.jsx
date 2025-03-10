import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import generateField from './generate-field'

export const GenerateForms = (fields) => {
  const { control } = useFormContext()
  const form = fields.map((field, index) => {
    if (field.type === 'fields_group')
      return (
        <React.Fragment key={index}>
          <p>{field.description}</p>
          {field.fields.map((field, index) => {
            return (
              <Controller
                key={index}
                name={field?.description}
                control={control}
                render={({ field: inputField }) =>
                  generateField(field.type, field.description, inputField, field?.options)
                }
              />
            )
          })}
        </React.Fragment>
      )
    else if (field.type === 'select_single') {
      return (
        <React.Fragment key={index}>
          <p>{field.description}</p>
          <Controller
            name={field.description}
            control={control}
            render={({ field: inputField }) => generateField(field.type, field.description, inputField, field?.options)}
          />
        </React.Fragment>
      )
    } else if (field.type === 'select_multiple') {
      const options = field.options.map((option, index) => ({
        text: option.text,
        value: index,
      }))
      console.log(field.description)
      return (
        <React.Fragment key={index}>
          <p>{field.description}</p>
          <Controller
            name={field.description}
            // defaultValue={0}
            defaultValue=""
            control={control}
            render={({ field: inputField }) => generateField(field.type, field.description, inputField, options)}
          />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment key={index}>
          <p>{field.description}</p>
          <Controller
            name={field.description}
            control={control}
            render={({ field: inputField }) => generateField(field.type, field.description, inputField)}
          />
        </React.Fragment>
      )
    }
  })

  return form
}
