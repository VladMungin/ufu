import { Radio, RadioGroup } from '@headlessui/react'
import cn from 'classnames'
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
          <div className="flex flex-col gap-x-4">
            <p>{field.description}</p>
            {(field.type === 'date' || field.type === 'time') && field.accept_interval && (
              <Controller
                name={`${field.description}-isInterval`}
                control={control}
                render={({ field }) => (
                  <RadioGroup
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
