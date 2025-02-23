export interface AuthResponse {
  access_token: string
  refresh_token: string
}

export interface RegisterData {
  email: string
  password: string
}

export interface Option {
  text: string
  edit_actions: {
    type: string
    placeholder: string
    text_to_insert: string
  }[]
}

export interface Subfield {
  type: string
  description: string
  blank_forbidden: boolean
  edit_action?: {
    type: string
    placeholder: string
  }
  shared_edit_action?: {
    type: string
    placeholder: string
    source: string
  }
  options: Option[]
}

export interface Field {
  type: string
  description: string
  imply_duplicates: boolean
  fields: Subfield[]
}

export interface Survey {
  request_template: boolean
  fields: Field[]
}
