import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Steps } from 'antd'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { queryDocumentPreview, querySurvey, querySurveyNext } from '../../api/api'
import { pdfAtom } from '../../store/store'
import StepFrom from './FormSteps/FirstStep'
import { transformData } from './FormSteps/lib/transform'

const Form = () => {
  const [tokens] = useCookies(['access_token'])
  const setPdf = useSetAtom(pdfAtom)
  const [params] = useSearchParams()

  const document_id = params.get('document_id')

  const {
    data: documentData,
    isSuccess,
    status,
  } = useQuery({
    queryKey: ['document', document_id],
    queryFn: () => {
      if (document_id) {
        return querySurvey(tokens.access_token, document_id)
      }
      return null
    },
    retry: 1,
    enabled: !!document_id,
  })

  const { mutateAsync, data: nextStageData } = useMutation({
    mutationKey: ['next-stage', document_id],
    mutationFn: ({ id, stages }) => querySurveyNext(id, stages),
  })

  const { mutateAsync: getDocumentPreview, data } = useMutation({
    mutationKey: ['document-preview', document_id],
    mutationFn: ({ id, stages }) => queryDocumentPreview(id, stages),
    onSuccess: (data) => {
      setPdf(data.filename)
    },
  })

  const { Step } = Steps
  const [currentStep, setCurrentStep] = useState(0)
  const { control, getValues } = useForm()

  const [stages, setStages] = useState([])

  const next = async () => {
    console.log(stages)
    const dataToQuery =
      currentStep === 0 ? transformData(documentData, getValues()) : transformData(nextStageData, getValues())

    await mutateAsync({
      id: document_id,
      stages: [...stages, ...dataToQuery],
    })
    await getDocumentPreview({
      id: document_id,
      stages: [...stages, ...dataToQuery],
    })

    setStages((prevStages) => [...prevStages, ...dataToQuery])
    setCurrentStep((prev) => prev + 1)
  }

  const [currentName, setCurrentName] = useState()
  // console.log(documentPreview)

  useEffect(() => {
    if (isSuccess) setCurrentName(documentData.name)
  }, [status])

  const prev = () => setCurrentStep(currentStep - 1)

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <StepFrom control={control} data={documentData} />
      default:
        return <StepFrom control={control} data={nextStageData} />
    }
  }

  if (!documentData) return <div className="">Загрузка</div>

  const stepsArray = Array.from({ length: currentStep + 1 }, (_, index) => index)

  return (
    <div className="w-[880px] rounded-[36px] border-[1px] border-[#C4C4FF] shadow-[0px_0px_16px_0px_#95A1FF33]">
      <form className="flex flex-col h-full justify-between">
        <div className="">
          <Steps current={currentStep} className="mt-7 px-[78px]">
            {stepsArray.map((step) => (
              <Step key={step} />
            ))}
          </Steps>
          <main className="mx-auto max-w-full px-[28px] mt-4">{renderStep(currentStep)}</main>
        </div>
        <div className="mx-auto max-w-full px-[28px] mt-4 flex justify-center mb-[28px] gap-4">
          <Button
            onClick={prev}
            disabled={currentStep === 0}
            type="default"
            className="max-w-[404px] h-[52px] py-3.5 px-[169px] font-semibold text-base border-[1px] border-[#C4C4FF] rounded-2xl"
          >
            Назад
          </Button>
          <Button
            onClick={next}
            type="primary"
            className="max-w-[404px] h-[52px] py-3.5 px-[169px] text-base font-semibold bg-[#5C5CFF] shadow-[0px_0px_16px_0px_#95A1FF33] rounded-2xl"
          >
            Вперед
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form
