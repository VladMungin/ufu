import { useAtom } from 'jotai'
import { pdfAtom } from '../../store/store'
import Form from '../Form/Form.jsx'
const Constructor = () => {
  const [pdf] = useAtom(pdfAtom)
  console.log(pdf)

  return (
    <div className="bg-white flex justify-center gap-6 mt-6 min-h-[80vh]">
      <Form />
      <div className="max-w-[880px] w-[100%]">
        <div className="relative h-full">
          <iframe src={`${import.meta.env.VITE_DATA_API}:3000/${pdf}`} width="100%" height="100%" />
        </div>
      </div>
    </div>
  )
}

export default Constructor
