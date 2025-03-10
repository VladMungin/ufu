import axios from 'axios'

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
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}:433/surveys/${id}`)

  return res.data
}

export const querySurveyNext = async (id, stages) => {
  const res = await axios.post(`${import.meta.env.VITE_DATA_API}:433/surveys/${id}/next_stage`, {
    stages,
  })

  return res.data
}

export const queryDocumentPreview = async (id, stages) => {
  const res = await axios.post(
    `${import.meta.env.VITE_DATA_API}:433/surveys/${id}/document_preview`,
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
}

export const querySuggestDocuments = async (request) => {
  const res = await axios.post(`${import.meta.env.VITE_DATA_API}:433/suggested_documents`, {
    request,
  })

  return res.data
}
