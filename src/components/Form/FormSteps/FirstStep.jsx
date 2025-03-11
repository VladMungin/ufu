import { GenerateForms } from '../../../lib/generate-forms'
import './Style/FirstStep.css'

const StepFrom = ({ data }) => {
  if (!data) return <>Загрузка</>

  return (
    <div className="flex flex-col">
      <GenerateForms fields={data.frontend_info.fields} />
    </div>
  )
}

export default StepFrom
