import { usePdf } from '@mikecousins/react-pdf'
import { useAtom } from 'jotai'
import { useRef, useState, useEffect } from 'react'
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
    onLoadSuccess: (pdf) => {
      setNumPages(pdf.numPages)
    },
  })

  // Отрисовка всех страниц при загрузке документа
  useEffect(() => {
    if (pdfDocument) {
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        pdfDocument.getPage(pageNum).then(page => {
          const viewport = page.getViewport({ scale: 1 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext).promise.then(() => {
            canvasRef.current.appendChild(canvas);
          });
        });
      }
    }
  }, [pdfDocument, numPages]);

  return (
    <div className="bg-white flex justify-center gap-6 mt-6 min-h-[80vh] lg:flex-row flex-col ">
      <Form />
      <div className="w-1/2">
        <div className="relative h-full overflow-auto">
          {isLoadingPreview ? (
            <div className="h-full flex flex-col items-center justify-center shadow-[0px_0px_16px_0px_#95A1FF33] rounded-3xl">
              <Loading className="fill-[#5C5CFF] animate-spin w-1/4" />
            </div>
          ) : pdf ? (
            <div ref={canvasRef} className="pdf-canvas-container" />
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
