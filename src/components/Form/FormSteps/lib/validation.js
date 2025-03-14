import * as yup from 'yup'

export const createValidationSchema = (fields) => {
  if (fields === undefined) {
    return yup.object().shape({})
  }
  const schema = {}
  fields.forEach((field) => {
    switch (field.type) {
      case 'fields_group':
        field.fields.forEach((subField) => {
          schema[subField.description] = createFieldSchema(subField)
        })
        break
      case 'text':
        schema[field.description] = createFieldSchema(field)

      case 'phone':
        schema[field.description] = createFieldSchema(field)

      case 'email':
        schema[field.description] = createFieldSchema(field)

      case 'date':
        schema[field.description] = createFieldSchema(field)

      case 'time':
        schema[field.description] = createFieldSchema(field)

      case 'select_single':
        schema[field.description] = createFieldSchema(field)
      default:
        break
    }
  })

  return yup.object().shape(schema)
}

const createFieldSchema = (field) => {
  let schema

  switch (field.type) {
    case 'text':
      schema = yup.string()
      break
    case 'phone':
      schema = yup.string().matches(/^\+?[0-9]{10,15}$/, 'Некорректный номер телефона')
      break
    case 'email':
      schema = yup.string().email('Некорректный email')
      break

    case 'select_single':
      schema = yup.string()
      break
    default:
      schema = yup.mixed()
      break
  }

  if (field.blank_forbidden) {
    schema = schema.required('Это поле обязательно для заполнения')
  }

  return schema
}
