import { useAtom } from 'jotai'
import PDF from 'react-pdf-js'
import { Loading } from '../../assets/loading.jsx'
import { loadingPreviewAtom, pdfAtom } from '../../store/store'
import Form from '../Form/Form.jsx'

const Constructor = () => {
  const [pdf] = useAtom(pdfAtom)
  const [isLoadingPreview] = useAtom(loadingPreviewAtom)

  return (
    <div className="bg-white flex justify-center gap-6 mt-6 min-h-[80vh] lg:flex-row flex-col ">
      <Form />
      <div className="w-1/2">
        <div className="relative h-full">
          {isLoadingPreview ? (
            <div className="h-full flex flex-col items-center justify-center shadow-[0px_0px_16px_0px_#95A1FF33] rounded-3xl">
              <Loading className="fill-[#5C5CFF] animate-spin w-1/4" />
            </div>
          ) : pdf ? (
            <PDF file={`${import.meta.env.VITE_DATA_API}/${pdf}`} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center shadow-[0px_0px_16px_0px_#95A1FF33] rounded-3xl">
              <img src="/logo.svg" alt="" className="w-1/2" />
              <h3 className="text-[50px] mt-14 text-[#5C5CFF]">Здесь будет документ</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Constructor
