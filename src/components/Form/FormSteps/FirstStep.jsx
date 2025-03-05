import { useCookies } from 'react-cookie'
import generateForms from '../../../lib/generate-forms'
import './Style/FirstStep.css'

const StepFrom = ({ data, control }) => {
  const [tokens] = useCookies(['access_token'])

  if (!data) return <>Загрузка</>

  return <div className="flex flex-col">{generateForms(data.frontend_info.fields, control)}</div>
}

export default StepFrom
