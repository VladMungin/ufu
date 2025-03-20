import { Radio, RadioGroup } from '@headlessui/react'
import cn from 'classnames'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { default as GenerateField } from './generate-field'
import GenerateUseFieldArray from './generate-use-field-array'

export const GenerateForms = ({ fields, name }) => {
  const { control } = useFormContext()
  const form = fields.map((field, index) => {
    if (field.type === 'embedded_text_fields') {
      return (
        <div className="">
          <p className="w-full px-4 text-base font-bold mb-2">{field.description}</p>
          <div className="w-[93%] mx-auto">
            {field.components.map((embeddedField) => {
              if (typeof embeddedField === 'string') {
                return embeddedField
              }
              return (
                <Controller
                  key={index}
                  name={`${name}-${field.description}-${embeddedField.description.replaceAll('.', '')}`}
                  control={control}
                  render={({ field: inputField, fieldState: { error } }) => (
                    <GenerateField
                      type={`${embeddedField.type}-embedded`}
                      error={error}
                      description={embeddedField.description}
                      field={inputField}
                      options={field?.options}
                    />
                  )}
                />
              )
            })}
          </div>
        </div>
      )
    } else if (field.type === 'fields_group') {
      if (field.imply_duplicates) {
        return (
          <GenerateUseFieldArray control={control} fieldsApi={field.fields} name={field.description} stepsName={name} />
        )
      }
      return (
        <React.Fragment key={index}>
          <p className="w-full px-4 text-base font-bold mb-2">{field.description}</p>
          {field.fields.map((field, index) => {
            return (
              <Controller
                key={index}
                name={`${name}-${field.description.replaceAll('.', '')}`}
                control={control}
                render={({ field: inputField, fieldState: { error } }) => (
                  <GenerateField
                    type={field.type}
                    error={error}
                    description={field.description}
                    tooltips={field.tooltips}
                    field={inputField}
                    options={field?.options}
                  />
                )}
              />
            )
          })}
        </React.Fragment>
      )
    } else if (field.type === 'select_single') {
      return (
        <React.Fragment key={index}>
          <Controller
            name={`${name}-${field.description.replaceAll('.', '')}`}
            control={control}
            render={({ field: inputField, fieldState: { error } }) => (
              <GenerateField
                error={error}
                type={field.type}
                description={field.description}
                tooltips={field.tooltips}
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
        input_field: option.input_field || false,
      }))
      return (
        <React.Fragment key={index}>
          <Controller
            name={`${name}-${field.description.replaceAll('.', '')}`}
            control={control}
            defaultValue={[]}
            render={({ field: inputField, fieldState: { error } }) => (
              <GenerateField
                type={field.type}
                error={error}
                description={field.description}
                tooltips={field.tooltips}
                field={inputField}
                options={options}
              />
            )}
          />
        </React.Fragment>
      )
    } else {
      const isIntervalOptions = [
        {
          text: 'Точное время',
          value: false,
        },
        {
          text: 'Промежуток времени',
          value: true,
        },
      ]
      return (
        <React.Fragment key={index}>
          <div className="w-full px-4 flex flex-col gap-x-4">
            {(field.type === 'date' || field.type === 'time') && field.accept_interval && (
              <Controller
                name={`${name}-${field.description}-isInterval`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <RadioGroup
                    error={error}
                    value={field.value}
                    onChange={field.onChange}
                    className="w-fit flex gap-x-4"
                    defaultValue={false}
                  >
                    {isIntervalOptions.map((option) => {
                      return (
                        <Radio value={option.value} key={option.value}>
                          {({ checked, disabled }) => (
                            <div
                              className={cn('gap-small flex cursor-pointer items-center  transition-colors', {
                                'text-main hover:text-main': !checked && !disabled,
                                'text-main': checked && !disabled,
                                '!cursor-not-allowed text-main': disabled,
                              })}
                            >
                              <div
                                className={cn(
                                  'flex size-5 items-center justify-center rounded-full border-[2px] border-[#5C5CFF]',
                                  {
                                    'border-[#5C5CFF] bg-white': checked,
                                  },
                                )}
                              >
                                <div
                                  className={cn('size-2.5 rounded-full opacity-0 transition-opacity', {
                                    'bg-[#5C5CFF] opacity-100': checked,
                                  })}
                                />
                              </div>
                              <h4
                                className={cn('ml-2', {
                                  'text-black': !disabled,
                                  'text-background-primary': disabled,
                                })}
                              >
                                {option.text}
                              </h4>
                            </div>
                          )}
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                )}
              />
            )}
          </div>
          <Controller
            name={`${name}-${field.description.replaceAll('.', '')}`}
            control={control}
            render={({ field: inputField, fieldState: { error } }) => (
              <GenerateField
                error={error}
                type={field.type}
                description={field.description}
                tooltips={field.tooltips}
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
