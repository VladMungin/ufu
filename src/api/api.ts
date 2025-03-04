import axios from 'axios'
import { RegisterData } from './types'

export const queryRegister = async ({ email, password }: RegisterData) => {
  const res = await axios.post(`${import.meta.env.VITE_AUTH_API}/auth/register`, {
    email,
    password,
  })

  return res.data
}

export const queryLogin = async ({ email, password }: RegisterData) => {
  const res = await axios.post(`${import.meta.env.VITE_AUTH_API}/auth/login`, {
    email,
    password,
  })

  return res.data
}

export const queryRefetchAccessToken = async (refreshToken: string) => {
  const res = await axios.post(`${import.meta.env.VITE_AUTH_API}/auth/refresh-token`, { refreshToken })

  return res.data
}

export const querySurvey = async (token: string, id: string) => {
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}:3000/surveys/${id}`)

  return res.data
}

export const querySurveyNext = async (id: string, stages: any[]) => {
  const res = await axios.post(`${import.meta.env.VITE_DATA_API}:3000/surveys/${id}/next_stage`, {
    stages,
  })

  return res.data
}

export const queryDocumentPreview = async (id: string, stages: any[]) => {
  const res = await axios.post(
    `${import.meta.env.VITE_DATA_API}:3000/surveys/${id}/document_preview`,
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

export const querySuggestDocuments = async (request: string) => {
  const res = await axios.post(`${import.meta.env.VITE_DATA_API}:3000/suggested_documents`, {
    request,
  })

  return res.data
}
