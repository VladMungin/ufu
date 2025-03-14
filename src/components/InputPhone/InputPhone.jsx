import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'

export const InputPhone = ({ classNameInput, ...rest }) => {
  const [value, setValue] = useState(rest.value)
  return (
    <PhoneInput
      defaultMask="(...)-...-..-.."
      alwaysDefaultMask
      specialLabel=""
      disableDropdown
      {...rest}
      value={value}
      inputClass={classNameInput}
      containerClass="w-full"
      onChange={(value) => {
        setValue(value)
        rest.onChange?.(value)
      }}
      buttonStyle={{ display: 'none' }}
    />
  )
}
