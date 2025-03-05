export const transformData = (dataFromAPI, dataFromForm) => {
  return [
    {
      name: dataFromAPI.name,
      fields: dataFromAPI.frontend_info.fields
        .map((field) => {
          if (field.type === 'term') {
            return undefined // Пропускаем поле типа 'term'
          }
          if (field.type === 'select_single') {
            return {
              type: field.type,
              chosen_option: {
                index: dataFromForm[field.description],
              },
            }
          }
          if (field.type === 'fields_group') {
            return {
              type: field.type,
              groups: [
                {
                  fields: field.fields.map((subfield) => {
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
