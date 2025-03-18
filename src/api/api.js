import axios from 'axios'
import { toast } from 'react-toastify'

export const queryRegister = async ({ email, password }) => {
  const res = await axios.post(`${import.meta.env.VITE_AUTH_API}/auth/register`, {
    email,
    password,
  })

  return res.data
}

export const queryLogin = async ({ email, password }) => {
  const res = await axios.post(`${import.meta.env.VITE_AUTH_API}/auth/login`, {
    email,
    password,
  })

  return res.data
}

export const queryRefetchAccessToken = async (refreshToken) => {
  const res = await axios.post(`${import.meta.env.VITE_AUTH_API}/auth/refresh-token`, { refreshToken })

  return res.data
}

export const querySurvey = async (token, id) => {
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}/surveys/${id}`)

  return res.data
}

export const querySurveyNext = async (id, stages) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_DATA_API}/surveys/${id}/next_stage`, {
      stages,
    })
    return res.data
  } catch (err) {
    toast.error('Не удалось загрузить следующие шаги формы, возможно вы неправильно заполнили поля предыдущего шага')
  }
}

export const queryDocumentPreview = async (id, stages) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_DATA_API}/surveys/${id}/document_preview`,
      {
        stages,
      },
      {
        headers: {
          responseType: 'blob', // important
        },
      },
    )
    return res.data
  } catch (err) {
    toast.error('Не удалось загрузить следующие шаги формы, возможно вы неправильно заполнили поля предыдущего шага', {
      autoClose: 5000,
      position: 'top-right',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
}

export const querySuggestDocuments = async (request) => {
  const res = await axios.post(`${import.meta.env.VITE_DATA_API}/suggested_documents`, {
    request,
  })

  return res.data
}

export const queryDownload = async (request, id) => {
  const res = await axios.post(
    `${import.meta.env.VITE_DATA_API}/surveys/${id}/download_document`,
    {
      stages: request,
    },
    {
      headers: {
        responseType: 'blob', // important
      },
      responseType: 'blob',
    },
  )

  return res.data
}
