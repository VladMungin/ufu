import React from 'react'
import { Controller } from 'react-hook-form'
import generateField from './generate-field'

const generateForms = (fields, control) => {
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
    } else {
      console.log(field)
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

export default generateForms
