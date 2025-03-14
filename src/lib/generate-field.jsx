import { Radio, RadioGroup } from '@headlessui/react'
import { Input, MenuItem, Select } from '@mui/material'
import cn from 'classnames'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { DatePicker, DateRangePicker, TimePicker, TimeRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { InputPhone } from '../components/InputPhone/InputPhone'

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const GenerateField = ({ type, description, field, options }) => {
  const { control, watch } = useFormContext()
  switch (type) {
    case 'term':
      return <p className="w-full px-5">{description}</p>
    case 'text':
      return (
        <div className="w-full px-5">
          <p>{description}</p>
          <Input
            {...field}
            type="text"
            className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
          />
        </div>
      )
    case 'email':
      return (
        <div className="w-full px-5">
          <p>{description}</p>
          <Input
            {...field}
            type="email"
            placeholder={description}
            className="w-full border-[1px] border-[#CCC2DcontrolC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
          />
        </div>
      )
    case 'password':
      return (
        <Input
          {...field}
          type="password"
          placeholder={description}
          className="border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
      )
    case 'time':
      return (
        <div className="w-full px-5">
          <p>{description}</p>

          {watch(`${field.name}-isInterval`) ? (
            <TimeRangePicker
              {...field}
              placeholder={description}
              format="HH:mm"
              className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
            />
          ) : (
            <TimePicker
              {...field}
              placeholder={description}
              format="HH:mm"
              placement="autoVerticalStart"
              className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
              ranges={[]}
            />
          )}
        </div>
      )
    case 'date':
      return (
        <div className="w-full px-5">
          <p>{description}</p>

          {watch(`${field.name}-isInterval`) ? (
            <DateRangePicker
              {...field}
              placeholder={description}
              ranges={[]}
              className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
              locale={{
                sunday: 'Su',
                monday: 'Mo',
                tuesday: 'Tu',
                wednesday: 'We',
                thursday: 'Th',
                friday: 'Fr',
                saturday: 'Sa',
                ok: 'OK',
                today: 'Today',
                yesterday: 'Yesterday',
                hours: 'Hours',
                minutes: 'Minutes',
                seconds: 'Seconds',
              }}
            />
          ) : (
            <DatePicker
              {...field}
              placeholder={description}
              ranges={[]}
              className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
              locale={{
                sunday: 'ВС',
                monday: 'ПН',
                tuesday: 'ВТ',
                wednesday: 'СР',
                thursday: 'ЧТ',
                friday: 'ПТ',
                saturday: 'СБ',
                ok: 'OK',
                today: 'Сегодня',
                yesterday: 'Завтра',
                hours: 'Часы',
                minutes: 'Минуты',
                seconds: 'Секунды',
                mar: 'Март',
              }}
            />
          )}
        </div>
      )
    case 'select_single':
      return (
        <div className="w-full px-5">
          <p>{description}</p>

          <Select
            className="w-full border-[1px] border-[#CCC2DC]  !rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
            {...field}
          >
            {options?.map((item, index) => {
              if (item.edit_action)
                return (
                  <MenuItem key={item.text} value={index}>
                    {item.edit_actions[0].text_to_insert}
                  </MenuItem>
                )
              else
                return (
                  <MenuItem key={item.text} value={index}>
                    {item.text}
                  </MenuItem>
                )
            })}
          </Select>
        </div>
      )
    case 'select_multiple':
      return (
        <div className="w-full px-5">
          <p>{description}</p>

          <RadioGroup value={field.value} onChange={field.onChange} className="w-fit flex flex-col gap-y-2 mt-2">
            {options.map((option) => {
              return (
                <Radio value={option.value} key={option.value}>
                  {({ checked, disabled }) => (
                    <div
                      className={cn('gap-small flex cursor-pointer  transition-colors', {
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
                        className={cn('ml-2 max-w-[90%] leading-5', {
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
          {field.value === options.length - 1 && (
            <Controller
              name={`${field.name}-other`}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    className="mt-6 border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4 w-full"
                  />
                )
              }}
            />
          )}
        </div>
      )
    case 'phone':
      return (
        <div className="px-5">
          <p>{description}</p>
          <InputPhone
            {...field}
            classNameInput={
              'w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4'
            }
          />
        </div>
      )
    default:
      return (
        <div className="px-5 w-full">
          <p>{description}</p>

          <Input
            {...field}
            type="text"
            placeholder={description}
            className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
          />
        </div>
      )
  }
}

export default GenerateField
