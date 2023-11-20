import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const PdfItemForm = ({
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
                        <FormLabel>Pdf Url</FormLabel>
                        <FormControl>
                            <Input placeholder='pdf url' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

export default PdfItemForm