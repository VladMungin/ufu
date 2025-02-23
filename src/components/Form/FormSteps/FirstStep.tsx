import { useCookies } from 'react-cookie'
import { Control } from 'react-hook-form'
import generateForms from '../../../lib/generate-forms'
import { FormInputs } from '../Form'
import './Style/FirstStep.css'

interface FirstStepProps {
  data: any
  control: Control<FormInputs, any>
}

const StepFrom = ({ data, control }: FirstStepProps) => {
  const [tokens] = useCookies(['access_token'])

  if (!data) return <>Загрузка</>

  return <div className="">{generateForms(data.frontend_info.fields, control)}</div>
}

export default StepFrom
