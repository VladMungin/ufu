import dayjs from 'dayjs'

export const transformData = (dataFromAPI, dataFromForm) => {
  console.log(dataFromAPI)
  return [
    {
      name: dataFromAPI.name,
      fields: dataFromAPI.frontend_info.fields
        .map((field) => {
          if (field.type === 'term') {
            return undefined // Пропускаем поле типа 'term'
          }
          if (field.type === 'select_multiple') {
            return {
              type: field.type,
              chosen_options: [
                {
                  index: dataFromForm[field.description.replaceAll('.', '')],
                  input: dataFromForm[`${field.description.replaceAll('.', '')}-other`] || '',
                },
              ],
            }
          }
          if (field.type === 'select_single') {
            return {
              type: field.type,
              chosen_option: {
                index: dataFromForm[field.description],
              },
            }
          }
          if (field.type === 'date') {
            return {
              type: field.type,
              input: dayjs(dataFromForm[field.description]).format('DD.MM.YYYY'),
            }
          }
          if (field.type === 'fields_group') {
            return {
              type: field.type,
              groups: [
                {
                  fields: field.fields.map((subfield) => {
                    if (subfield.type === 'date') {
                      return {
                        type: subfield.type,
                        input: dayjs(dataFromForm[subfield.description]).format('DD:MM:YYYY'),
                      }
                    }
                    return {
                      type: subfield.type,
                      input: dataFromForm[subfield.description],
                    }
                  }),
                },
              ],
            }
          }
          return {
            type: field.type,
            input: dataFromForm[field.description] || '',
          }
        })
        .filter((field) => field !== undefined),
    },
  ]
}
