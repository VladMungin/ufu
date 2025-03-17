import dayjs from 'dayjs'

export const transformData = (dataFromAPI, dataFromForm) => {
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
              chosen_options: dataFromForm[field.description.replaceAll('.', '')].map((value) => {
                return {
                  index: value,
                  input: dataFromForm[`${field.description.replaceAll('.', '')}-${value}-other`] || '',
                }
              }),
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
            if (Array.isArray(dataFromForm[field.description])) {
              return {
                type: field.type,
                input: [
                  dayjs(dataFromForm[field.description][0]).format('DD.MM.YYYY'),
                  dayjs(dataFromForm[field.description][1]).format('DD.MM.YYYY'),
                ],
              }
            }
            return {
              type: field.type,
              input: dayjs(dataFromForm[field.description]).format('DD.MM.YYYY'),
            }
          }
          if (field.type === 'time') {
            if (Array.isArray(dataFromForm[field.description])) {
              return {
                type: field.type,
                input: `В промежуток времени с ${dayjs(dataFromForm[field.description][0]).format('HH:MM')} по ${dayjs(dataFromForm[field.description][1]).format('HH:MM')}`,
              }
            }
            return {
              type: field.type,
              input: `${dayjs(dataFromForm[field.description]).format('HH:MM')}`,
            }
          }
          if (field.type === 'fields_group') {
            if (field.imply_duplicates) {
              return {
                type: field.type,
                groups: dataFromForm[field.description.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', '')].map(
                  (group) => {
                    return {
                      fields: field.fields.map((subfield) => {
                        if (subfield.type === 'date') {
                          return {
                            type: subfield.type,
                            input: dayjs(
                              group[subfield.description.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', '')],
                            ).format('DD.MM.YYYY'),
                          }
                        }
                        return {
                          type: subfield.type,
                          input: group[subfield.description.replace(/[\p{P}\p{S}]/gu, '').replaceAll(' ', '')],
                        }
                      }),
                    }
                  },
                ),
              }
            }
            return {
              type: field.type,
              groups: [
                {
                  fields: field.fields.map((subfield) => {
                    if (subfield.type === 'date') {
                      return {
                        type: subfield.type,
                        input: dayjs(dataFromForm[subfield.description]).format('DD.MM.YYYY'),
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
