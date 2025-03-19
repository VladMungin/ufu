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
          if (field.type === 'embedded_text_fields') {
            const components = []
            dataFromAPI.frontend_info.fields.forEach((field) => {
              if (field.type === 'embedded_text_fields') {
                field.components.forEach((component) => {
                  if (typeof component !== 'string') {
                    if (component.type === 'date') {
                      components.push({
                        type: component.type,
                        input: dayjs(
                          dataFromForm[
                            `${dataFromAPI.name}-${field.description.replaceAll('.', '')}-${component.description.replaceAll('.', '')}`
                          ],
                        ).format('DD.MM.YYYY'),
                      })
                    } else {
                      components.push({
                        type: component.type,
                        input:
                          dataFromForm[
                            `${dataFromAPI.name}-${field.description.replaceAll('.', '')}-${component.description.replaceAll('.', '')}`
                          ],
                      })
                    }
                  }
                })
              }
            })
            console.log(components)
            return {
              type: field.type,
              components: [
                {
                  text_fields: components,
                },
              ],
            }
          }
          if (field.type === 'select_multiple') {
            return {
              type: field.type,
              chosen_options: dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`].map(
                (value) => {
                  console.log(dataFromForm)
                  console.log(`${dataFromAPI.name}-${field.description.replaceAll('.', '')}-${value}-other`)
                  return {
                    index: value,
                    input:
                      dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}-${value}-other`] || '',
                  }
                },
              ),
            }
          }
          if (field.type === 'select_single') {
            return {
              type: field.type,
              chosen_option: {
                index: dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`],
              },
            }
          }
          if (field.type === 'date') {
            if (Array.isArray(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`])) {
              return {
                type: field.type,
                input: [
                  dayjs(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`][0]).format(
                    'DD.MM.YYYY',
                  ),
                  dayjs(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`][1]).format(
                    'DD.MM.YYYY',
                  ),
                ],
              }
            }
            return {
              type: field.type,
              input: dayjs(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`]).format(
                'DD.MM.YYYY',
              ),
            }
          }
          if (field.type === 'time') {
            if (Array.isArray(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`])) {
              return {
                type: field.type,
                input: `В промежуток времени с ${dayjs(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`][0]).format('HH:MM')} по ${dayjs(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`][1]).format('HH:MM')}`,
              }
            }
            return {
              type: field.type,
              input: `${dayjs(dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`]).format('HH:MM')}`,
            }
          }
          if (field.type === 'fields_group') {
            if (field.imply_duplicates) {
              return {
                type: field.type,
                groups: dataFromForm[
                  `${dataFromAPI.name}-${field.description
                    .replace(/[\p{P}\p{S}]/gu, '')
                    .replaceAll('.', '')
                    .replaceAll(' ', '')}`
                ].map((group) => {
                  return {
                    fields: field.fields.map((subfield) => {
                      if (subfield.type === 'date') {
                        return {
                          type: subfield.type,
                          input: dayjs(
                            group[`${subfield.description.replace(/[\p{P}\p{S}]/gu, '').replaceAll('.', '')}`],
                          ).format('DD.MM.YYYY'),
                        }
                      }
                      return {
                        type: subfield.type,
                        input:
                          group[
                            `${subfield.description
                              .replace(/[\p{P}\p{S}]/gu, '')
                              .replaceAll('.', '')
                              .replaceAll(' ', '')}`
                          ],
                      }
                    }),
                  }
                }),
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
                        input: dayjs(
                          dataFromForm[`${dataFromAPI.name}-${subfield.description.replaceAll('.', '')}`],
                        ).format('DD.MM.YYYY'),
                      }
                    }
                    return {
                      type: subfield.type,
                      input: dataFromForm[`${dataFromAPI.name}-${subfield.description.replaceAll('.', '')}`],
                    }
                  }),
                },
              ],
            }
          }
          return {
            type: field.type,
            input: dataFromForm[`${dataFromAPI.name}-${field.description.replaceAll('.', '')}`] || '',
          }
        })
        .filter((field) => field !== undefined),
    },
  ]
}
