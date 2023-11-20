/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import GalleryItemSelector from './GalleryItemSelector'

const ImageSlideForm = ({
  form
}: {
  form: UseFormReturn<any>
}) => {
  return (
    <>
      <FormField
        name={`content.slides`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Slides</FormLabel>
            <FormControl>
              <GalleryItemSelector value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default ImageSlideForm