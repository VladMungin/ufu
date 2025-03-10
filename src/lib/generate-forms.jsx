import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { default as GenerateField } from './generate-field'

export const GenerateForms = ({ fields }) => {
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
                render={({ field: inputField }) => (
                  <GenerateField
                    type={field.type}
                    description={field.description}
                    field={inputField}
                    options={field?.options}
                  />
                )}
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
            render={({ field: inputField }) => (
              <GenerateField
                type={field.type}
                description={field.description}
                field={inputField}
                options={field?.options}
              />
            )}
          />
        </React.Fragment>
      )
    } else if (field.type === 'select_multiple') {
      const options = field.options.map((option, index) => ({
        text: option.text,
        value: index,
      }))
      return (
        <React.Fragment key={index}>
          <p>{field.description}</p>
          <Controller
            name={field.description.replaceAll('.', '')}
            control={control}
            render={({ field: inputField }) => (
              <GenerateField type={field.type} description={field.description} field={inputField} options={options} />
            )}
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
            render={({ field: inputField }) => (
              <GenerateField
                type={field.type}
                description={field.description}
                field={inputField}
                options={field?.options}
              />
            )}
          />
        </React.Fragment>
      )
    }
  })

  return form
}
