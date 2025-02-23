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

export const querySurveyNext = async (id: string, stages) => {
  const res = await axios.post(`${import.meta.env.VITE_DATA_API}:3000/surveys/${id}/next_stage`, {
    stages,
  })

  return res.data
}

export const querySurveyNewTemplate = async () => {
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}/survey/new_template_part`)

  return res.data
}

export const querySurveyInfo = async () => {
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}/survey/info_from_external_source`)

  return res.data
}

export const queryGetDocument = async (token: string, number_of_document: number) => {
  // const [access_token] = useCookies(['access_token'])
  // console.log(access_token.access_token)
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}:8080/constructor/documents/${number_of_document}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

export const queryJSON = async (token: string, name: string) => {
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}:8080/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // console.log(res)
  return res.data
}

export const queryHTML = async (token: string, name: string) => {
  // console.log(name)
  const res = await axios.get(`${import.meta.env.VITE_DATA_API}:8080/${name}.html`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // console.log(res)
  return res.data
}

export const querySuggestDocuments = async (request: string) => {
  const res = await axios.post(`${import.meta.env.VITE_DATA_API}:3000/suggested_documents`, {
    request,
  })

  return res.data
}
