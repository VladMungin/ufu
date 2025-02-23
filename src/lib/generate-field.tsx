import { FormControl, MenuItem, Select } from '@mui/material'
import { Input, Radio } from 'antd'
import { ControllerRenderProps } from 'react-hook-form'
import { DateRangePicker, TimeRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { Option } from '../api/types'

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const generateField = (type: string, description: string, field: ControllerRenderProps, options?: Option[]) => {
  switch (type) {
    case 'text':
      return (
        <Input
          {...field}
          type="text"
          placeholder={description}
          className="border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
      )
    case 'email':
      return (
        <Input
          {...field}
          type="email"
          placeholder={description}
          className="border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
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
        <TimeRangePicker
          {...field}
          placeholder={description}
          format="HH:mm"
          className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
      )
    case 'date':
      return (
        <DateRangePicker
          showOneCalendar
          placeholder={description}
          ranges={[]}
          className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
      )
    case 'select_single':
      return (
        <FormControl fullWidth>
          <Select className="w-full" label={description} {...field}>
            {options?.map((item, index) => {
              if (item.edit_actions)
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
        </FormControl>
      )
    case 'select_multiple':
      console.log(options)
      return (
        <Radio.Group
          {...field}
          style={style}
          options={options.map((item, index) => ({
            value: item.text,
            label: item.text,
          }))}
        />
      )
    default:
      return (
        <Input
          {...field}
          type="text"
          placeholder={description}
          className="border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
      )
  }
}

export default generateField
