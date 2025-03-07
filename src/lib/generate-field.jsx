import { FormControl, Input, MenuItem, Select } from '@mui/material'
import { DatePicker, TimeRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { RadioGroup } from '../components/RadioGroup/RadioGroup'

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const generateField = (type, description, field, options) => {
  switch (type) {
    case 'term':
      return <p>{description}</p>
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
        <DatePicker
          {...field}
          showOneCalendar
          placeholder={description}
          ranges={[]}
          className="w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
        />
      )
    case 'select_single':
      return (
        <FormControl fullWidth>
          <Select
            className="border-[1px] border-[#CCC2DC]  !rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4"
            label={description}
            {...field}
          >
            {options?.map((item, index) => {
              if (item.edit_actionйцуйцуs)
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
      console.log(field)
      console.log(options)
      return <RadioGroup {...field} options={options} />

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
