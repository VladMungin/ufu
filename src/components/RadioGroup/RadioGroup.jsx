import { Field, RadioGroup as HeadlessRadioGroup, Radio } from '@headlessui/react'
import cn from 'classnames'

export const RadioGroup = ({ value, options, className, optionClassName, onChange }) => {
  console.log(value)
  return (
    <HeadlessRadioGroup className={cn('w-fit', className)} value={value} onChange={onChange}>
      {options?.map((option) => (
        <Field key={`${option.text}`}>
          <Radio
            value={option.text}
            disabled={option.disabled}
            onClick={(event) => {
              event.stopPropagation()
            }}
            onTouchStart={(event) => {
              event.stopPropagation()
              onChange(option.text)
            }}
          >
            {({ checked, disabled }) => (
              <div
                className={cn(
                  'gap-small flex cursor-pointer items-center  transition-colors',
                  {
                    'text-main hover:text-main': !checked && !disabled,
                    'text-main': checked && !disabled,
                    '!cursor-not-allowed text-main': disabled,
                  },
                  optionClassName,
                )}
              >
                <div
                  className={cn('flex size-5 items-center justify-center rounded-full border-[2px] border-[#5C5CFF]', {
                    'border-[#5C5CFF] bg-white': checked,
                  })}
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
        </Field>
      ))}
    </HeadlessRadioGroup>
  )
}
