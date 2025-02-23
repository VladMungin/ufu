import { useAtom } from 'jotai'
import { htmlAtom } from '../../store/store'
import Form from '../Form/Form'

const Constructor = () => {
  const [data3] = useAtom(htmlAtom) // Подписываемся на атом

  return (
    <div className="bg-white flex justify-center gap-6 mt-6 min-h-[80vh]">
      <Form />
      <div className="max-w-[880px] w-[100%]">
        <div className="relative h-full">
          <div dangerouslySetInnerHTML={{ __html: data3 }} />
        </div>
      </div>
    </div>
  )
}

export default Constructor
