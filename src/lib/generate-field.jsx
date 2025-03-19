import { Input, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, DatePicker, DateRangePicker, TimePicker, TimeRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { InputPhone } from '../components/InputPhone/InputPhone'
import { Tooltip } from '../components/Tooltip/Tooltip'
import { descriptionWithTooltip } from '../helpers/description_with_tooltip'

const GenerateField = ({ type, description, tooltips, field, options, error }) => {
  const { control, watch } = useFormContext()
  if (type.includes('embedded')) {
    const placeholderWidth = description.split('').length
    if (type.includes('date')) {
      return (
        <DatePicker
          {...field}
          ranges={[]}
          error={error}
          className="border-b border-black"
          cleanable={false}
          placeholder={description}
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
          caretAs={() => null}
          style={{
            width: `${placeholderWidth}ch`,
          }}
        />
      )
    }
    return (
      <Input
        className="border-b border-black"
        placeholder={description}
        {...field}
        style={{
          width: `${placeholderWidth}ch`,
        }}
      />
    )
  }
  switch (type) {
    case 'term':
      return (
        <p className="w-full px-5 relative my-2">
          {tooltips &&
            descriptionWithTooltip(description, tooltips).map((crumb, index) => (
              <React.Fragment className="">
                {crumb.definition ? (
                  <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                    <span key={index} className="font-bold">
                      {crumb.text}{' '}
                    </span>
                  </Tooltip>
                ) : (
                  <span key={index}>{crumb.text} </span>
                )}
              </React.Fragment>
            ))}
          {!tooltips && description}
        </p>
      )
    case 'text':
      return (
        <div className="w-full px-5 relative my-2">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>
          <Input
            {...field}
            type="text"
            className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
          />
          <p className="text-red-600 absolute -bottom-2">{error?.message}</p>
        </div>
      )
    case 'email':
      return (
        <div className="w-full px-5 relative my-2">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>
          <Input
            {...field}
            error={error}
            type="email"
            className="w-full border-[1px] border-[#CCC2DcontrolC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
          />
          <p className="text-red-600  absolute -bottom-2">{error?.message}</p>
        </div>
      )
    case 'password':
      return (
        <Input
          {...field}
          type="password"
          error={error}
          placeholder={description}
          className="border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
      )
    case 'time':
      return (
        <div className="w-full px-5 relative my-2">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>
          {watch(`${field.name}-isInterval`) ? (
            <TimeRangePicker
              {...field}
              error={error}
              format="HH:mm"
              className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
            />
          ) : (
            <TimePicker
              {...field}
              format="HH:mm"
              error={error}
              placement="autoVerticalStart"
              className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
              ranges={[]}
            />
          )}
          <p className="text-red-600 absolute -bottom-2">{error?.message}</p>
        </div>
      )
    case 'date':
      return (
        <div className="w-full px-5 relative my-2">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>

          {watch(`${field.name}-isInterval`) ? (
            <DateRangePicker
              {...field}
              ranges={[]}
              className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
              error={error}
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
              ranges={[]}
              error={error}
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
          <p className="text-red-600 absolute -bottom-2">{error?.message}</p>
        </div>
      )
    case 'select_single':
      return (
        <div className="w-full px-5 relative my-2">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>
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
          <p className="text-red-600 absolute -bottom-2">{error?.message}</p>
        </div>
      )
    case 'select_multiple':
      return (
        <div className="w-full px-5 relative my-2">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>
          <div className="flex flex-col">
            {options.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <Checkbox
                  value={option.value}
                  checked={field.value.includes(option.value)}
                  onChange={(e) => {
                    const value = e
                    const newValue = field.value.includes(value)
                      ? field.value.filter((val) => val !== value)
                      : [...field.value, value]
                    field.onChange(newValue)
                  }}
                />
                {option.text}
                {field.value.includes(option.value) && option.input_field && (
                  <Controller
                    name={`${field.name}-${option.value}-other`}
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
              </label>
            ))}
          </div>
          {/* <RadioGroup value={field.value} onChange={field.onChange} className="w-fit flex flex-col gap-y-2 mt-2">
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
          </RadioGroup> */}
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
        <div className="w-full px-5 relative my-2">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>
          <InputPhone
            {...field}
            classNameInput={
              'w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4'
            }
          />
          <p className="text-red-600 absolute -bottom-2">{error?.message}</p>
        </div>
      )
    default:
      return (
        <div className="px-5 w-full">
          <p>
            {tooltips &&
              descriptionWithTooltip(description, tooltips).map((crumb, index) => (
                <React.Fragment className="">
                  {crumb.definition ? (
                    <Tooltip label={crumb.definition} className="shadow-[0px_0px_16px_0px_#95A1FF33]">
                      <span key={index} className="font-bold">
                        {crumb.text}{' '}
                      </span>
                    </Tooltip>
                  ) : (
                    <span key={index}>{crumb.text} </span>
                  )}
                </React.Fragment>
              ))}
            {!tooltips && description}
          </p>

          <Input
            {...field}
            type="text"
            className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
          />
        </div>
      )
  }
}

export default GenerateField
