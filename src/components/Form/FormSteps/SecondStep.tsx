import { useQuery } from '@tanstack/react-query'
import { Control } from 'react-hook-form'
import 'rsuite/dist/rsuite.min.css'
import { querySurveyNext } from '../../../api/api'
import generateForms from '../../../lib/generate-forms'
import { FormInputs } from '../Form'
import './Style/SecondStep.css'

interface SecondStepProps {
  control: Control<FormInputs, unknown>
}

const SecondStep = ({ control }: SecondStepProps) => {
  const { data } = useQuery({
    queryKey: ['secondStep'],
    queryFn: querySurveyNext,
  })
  // console.log(data)
  if (!data) return <>Загрузка</>
  return <div>{generateForms(data?.fields, control)}</div>
  // return (
  // 	<div>
  // 		<p>
  // 			Укажите все известные Вам данные того, кто именно совершил общественно
  // 			опасное деяние
  // 		</p>
  // 		<Controller
  // 			name='mail'
  // 			control={control}
  // 			render={() => (
  // 				<Input
  // 					placeholder='Адрес электронной почты'
  // 					className='border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4'
  // 				/>
  // 			)}
  // 		/>
  // 		<Controller
  // 			name='time'
  // 			control={control}
  // 			render={() => (
  // 				<TimeRangePicker
  // 					format='HH:mm'
  // 					className='w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4'
  // 				/>
  // 			)}
  // 		/>
  // 		<Controller
  // 			name='date'
  // 			control={control}
  // 			render={() => (
  // 				<DateRangePicker
  // 					showOneCalendar
  // 					ranges={[]}
  // 					className='w-full border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4'
  // 				/>
  // 			)}
  // 		/>
  // 		<Controller
  // 			name='incedentAddress'
  // 			control={control}
  // 			render={() => (
  // 				<Input
  // 					placeholder='Адрес происшествия'
  // 					className='border-[1px] border-[#CCC2DC] p-4 rounded-2xl hover:border-[1px] hover:border-[#CCC2DC] mb-4'
  // 				/>
  // 			)}
  // 		/>
  // 	</div>
  // );
}

export default SecondStep
