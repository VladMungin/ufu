import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Steps } from 'antd'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { queryDocumentPreview, queryDownload, querySurvey, querySurveyNext } from '../../api/api'
import { loadingPreviewAtom, pdfAtom } from '../../store/store'
import StepFrom from './FormSteps/FirstStep'
import LastStep from './FormSteps/last-step'
import { transformData } from './FormSteps/lib/transform'

export const fileForceDownload = async (url, filename) => {
  const aElement = document.createElement('a')
  aElement.download = filename
  aElement.href = url
  // For Firefox https://stackoverflow.com/a/32226068
  document.body.appendChild(aElement)
  aElement.click()
  aElement.remove()
  return url
}

const Form = () => {
  const [tokens] = useCookies(['access_token'])
  const setPdf = useSetAtom(pdfAtom)
  const [loadingPreview, setLoadingPreviewAtom] = useAtom(loadingPreviewAtom)

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

  const { mutateAsync: getDocumentPreview, isPending } = useMutation({
    mutationKey: ['document-preview', document_id],
    mutationFn: ({ id, stages }) => queryDocumentPreview(id, stages),
    onSuccess: (data) => {
      setPdf(data.filename)
      setLoadingPreviewAtom(false)
    },
  })

  const { Step } = Steps
  const [currentStep, setCurrentStep] = useState(0)
  const method = useForm({
    mode: 'onChange',
    // resolver: yupResolver(
    //   createValidationSchema(documentData?.frontend_info.fields || nextStageData?.frontend_info.fields),
    // ),
  })
  const [stages, setStages] = useState([])

  const next = async () => {
    // setLoadingPreviewAtom(true)
    if (nextStageData === null) {
      const res = await queryDownload(stages, document_id)
      const url = window.URL.createObjectURL(new Blob([res]))

      // Создаем временную ссылку
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `document_${document_id}.docx`) // Имя файла, который будет скачан

      // Добавляем ссылку на страницу и кликаем по ней
      document.body.appendChild(link)
      link.click()

      // Удаляем ссылку с страницы
      link.parentNode.removeChild(link)
      return
    }
    const dataToQuery =
      currentStep === 0
        ? transformData(documentData, method.getValues())
        : transformData(nextStageData, method.getValues())

    await mutateAsync({
      id: document_id,
      stages: [...stages, ...dataToQuery],
    })
    await getDocumentPreview({
      id: document_id,
      stages: [...stages, ...dataToQuery],
    })

    setStages((prevStages) => [...prevStages, ...dataToQuery])
    // setCurrentStep((prev) => prev + 1)
  }

  const [currentName, setCurrentName] = useState()

  useEffect(() => {
    if (isSuccess) setCurrentName(documentData.name)
  }, [status])

  const prev = async () => {
    setLoadingPreviewAtom(true)

    if (currentStep === 1) {
      setStages((prevStages) => {
        const newStages = [...prevStages]
        newStages.pop() // Удаляем последний элемент массива
        return newStages
      })
      setCurrentStep((prevStep) => prevStep - 1)
      setPdf('')
      setLoadingPreviewAtom(false)
      return
    }
    if (currentStep > 0) {
      // Удаляем последний элемент массива stages
      setStages((prevStages) => {
        const newStages = [...prevStages]
        newStages.pop() // Удаляем последний элемент массива
        return newStages
      })

      // Обновляем данные на сервере с новым массивом stages
      await mutateAsync({
        id: document_id,
        stages: stages.slice(0, -1), // Отправляем stages без последнего элемента
      })

      // Обновляем превью документа
      await getDocumentPreview({
        id: document_id,
        stages: stages.slice(0, -1), // Отправляем stages без последнего элемента
      })

      // Уменьшаем текущий шаг
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  const renderStep = (step) => {
    if (step === 0) {
      return <StepFrom data={documentData} />
    }
    if (nextStageData === null) {
      return <LastStep />
    }
    return <StepFrom data={nextStageData} />
  }
  if (!documentData) return <div className="mx-auto">Загрузка</div>

  const stepsArray = Array.from({ length: currentStep + 1 }, (_, index) => index)

  return (
    <div className="lg:w-1/2 rounded-[36px] border-[1px] border-[#C4C4FF] shadow-[0px_0px_16px_0px_#95A1FF33] mx-4 flex flex-col justify-between">
      <FormProvider {...method} className="flex flex-col h-full justify-between">
        <div className="">
          <Steps current={currentStep} className="mt-7 px-11 lg:px-[78px]">
            {stepsArray.map((step) => (
              <Step key={step} />
            ))}
          </Steps>
          <main className=" lg:mx-auto max-w-full mx-[28px] mt-4">{renderStep(currentStep)}</main>
        </div>
        <div className="mx-auto w-full px-5 mt-4 flex justify-center mb-[28px] gap-4">
          <Button
            onClick={prev}
            // disabled={currentStep === 0 || loadingPreview}
            type="default"
            className="max-w-[404px] h-[52px] py-3.5 w-1/2 font-semibold text-base border-[1px] border-[#C4C4FF] rounded-2xl"
          >
            Назад
          </Button>
          <Button
            disabled={!method.formState.isValid || loadingPreview}
            onClick={next}
            type="primary"
            className="max-w-[404px] h-[52px] py-3.5 w-1/2 text-base font-semibold bg-[#5C5CFF] shadow-[0px_0px_16px_0px_#95A1FF33] rounded-2xl"
          >
            {nextStageData === null && <img src="/download.svg" />}
            {nextStageData === null ? 'Скачать' : 'Вперед'}
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}

export default Form
