import { PdfContent } from '@/schema/item-schema'
import React from 'react'

const PdfItemRenderer = ({
    thumbnail,
    content
}: {
    thumbnail?: string|null,
    content: PdfContent
}) => {
  return (
    <div>Pdf Item</div>
  )
}

export default PdfItemRenderer