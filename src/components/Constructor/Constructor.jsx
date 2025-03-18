import { usePdf } from '@mikecousins/react-pdf'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Loading } from '../../assets/loading.jsx'
import { loadingPreviewAtom, pdfAtom } from '../../store/store'
import Form from '../Form/Form.jsx'

const Constructor = () => {
  const [pdf] = useAtom(pdfAtom)
  const [isLoadingPreview] = useAtom(loadingPreviewAtom)

  const canvasRef = useRef(null)
  const [numPages, setNumPages] = useState(null)

  const { pdfDocument } = usePdf({
    file: `${import.meta.env.VITE_DATA_API}/${pdf}`,
    onDocumentLoadSuccess: (pdf) => {
      setNumPages(pdf.numPages)
    },
  })

  useEffect(() => {
    if (pdfDocument) {
      canvasRef.current.innerHTML = ''

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        pdfDocument.getPage(pageNum).then((page) => {
          const viewport = page.getViewport({ scale: 1.3 })
          canvas.height = viewport.height
          canvas.width = viewport.width
          canvas.style.marginLeft = 'auto'
          canvas.style.marginRight = 'auto'
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          }
          page.render(renderContext).promise.then(() => {
            canvasRef.current.appendChild(canvas)
            if (pageNum < numPages) {
              const separator = document.createElement('div')
              separator.style.height = '10px' // высота полосы
              separator.style.backgroundColor = '#000' // цвет полосы
              separator.style.width = `${viewport.width}px` // ширина полосы
              separator.style.margin = '0' // убрать отступы
              canvasRef.current.appendChild(separator)
            }
          })
        })
      }
    }
  }, [pdfDocument, numPages])

  return (
    <div className="bg-white flex justify-center gap-6 mt-6 min-h-[80vh] md:flex-row flex-col ">
      <Form />
      <div className="md:w-1/2 px-4 md:px-0">
        <div className="relative h-[600px] md:h-full overflow-auto">
          {isLoadingPreview ? (
            <div className="h-[600px] md:h-full flex flex-col items-center justify-center shadow-[0px_0px_16px_0px_#95A1FF33] rounded-3xl border border-[#5C5CFF]">
              <Loading className="fill-[#5C5CFF] animate-spin w-1/4" />
            </div>
          ) : pdf ? (
            <div className="md:fixed h-[600px] md:h-[720px] shadow-[0px_0px_16px_0px_#95A1FF33] rounded-3xl border border-[#5C5CFF] overflow-auto  py-5 ">
              <div
                ref={canvasRef}
                style={{ height: '100%', display: 'block' }}
                className="pdf-canvas-container overflow-x mx-auto mr-1"
              />
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center shadow-[0px_0px_16px_0px_#95A1FF33] rounded-3xl border border-[#5C5CFF] md:h-[720px]">
              <img src="/logo.svg" alt="" className="w-1/2" />
              <h3 className="text-2xl md:leading-10 text-center md:text-[50px] mt-14 text-[#5C5CFF]">
                Здесь будет документ
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Constructor
