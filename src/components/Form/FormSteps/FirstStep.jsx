import { GenerateForms } from '../../../lib/generate-forms'
import './Style/FirstStep.css'

const StepFrom = ({ data }) => {
  if (!data) return <>Загрузка</>

  return (
    <div className="flex flex-col">
      <GenerateForms fields={data.frontend_info.fields} name={data.name}/>
    </div>
  )
}

export default StepFrom
