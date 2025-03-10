import { useCookies } from 'react-cookie'
import { useFormContext } from 'react-hook-form'
import { GenerateForms } from '../../../lib/generate-forms'
import './Style/FirstStep.css'

const StepFrom = ({ data }) => {
  const { control } = useFormContext()
  const [tokens] = useCookies(['access_token'])

  if (!data) return <>Загрузка</>

  return (
    <div className="flex flex-col">
      <GenerateForms fields={data.frontend_info.fields} />
    </div>
  )
}

export default StepFrom
