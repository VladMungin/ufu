import React, { useEffect, useState } from 'react'
import { Document, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Указываем путь к worker-файлу для pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const PDFReader = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null)
  const [pdfData, setPdfData] = useState(null)

  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPdfData(url)
    }

    fetchPdf()
  }, [pdfUrl])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  return (
    <div>
      <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}></Document>
    </div>
  )
}

export default PDFReader
