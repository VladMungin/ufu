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
    case 'date':
      schema = yup.date()
      break
    case 'time':
      schema = yup.string()
      break
    case 'select_single':
      schema = yup.string()
      break
    default:
      schema = yup.string()
      break
  }

  if (field.blank_forbidden) {
    schema = schema.required('Это поле обязательно для заполнения')
  }

  return schema
}

// Пример использования
const fields = [
  {
    type: 'fields_group',
    description: 'Введите собственные данные',
    imply_duplicates: false,
    fields: [
      {
        type: 'text',
        description: 'Введите ФИО',
        hint: 'ФИО',
        blank_forbidden: true,
      },
      {
        type: 'text',
        description: 'Введите адрес места жительства/места пребывания',
        hint: 'Адрес',
        blank_forbidden: true,
      },
      {
        type: 'phone',
        description: 'Введите номер телефона',
        blank_forbidden: true,
      },
      {
        type: 'email',
        description: 'Введите адрес электронной почты',
        hint: 'Email',
        blank_forbidden: true,
      },
    ],
  },
  {
    type: 'date',
    description: 'Укажите дату происшествия',
    accept_interval: true,
    format: true,
    blank_forbidden: true,
  },
  {
    type: 'time',
    description: 'Укажите время происшествия',
    accept_interval: true,
    format: true,
    blank_forbidden: true,
  },
  {
    type: 'select_single',
    description: 'Укажите район происшествия',
    options: [
      {
        text: 'Ворошиловский',
      },
      {
        text: 'Железнодорожный',
      },
      {
        text: 'Кировский',
      },
      {
        text: 'Ленинский',
      },
      {
        text: 'Октябрьский',
      },
      {
        text: 'Первомайский',
      },
      {
        text: 'Пролетарский',
      },
      {
        text: 'Советский',
      },
    ],
  },
]
