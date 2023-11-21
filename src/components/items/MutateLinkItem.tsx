/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { Input } from '../ui/input'
import { isValidUrl } from '@/lib/utils'

const MutateLinkItem = ({
    form
}: {
    form: UseFormReturn<any>
}) => {

    // const watch = useWatch({control: form.control, name: ['content.url']})
    // const [autoUpdate, setAutoUpdate] = useState<{favicon: boolean, origin: boolean}>({favicon: true, origin: true})

    // const handleFaviconInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = ev.target.value;
    //     if(!value || !isValidUrl){
            
    //     }
    // }

    // console.log({watch});

    return (
        <>

            <FormField
                name={`content.url`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Link URL</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter link url' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="content.originUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Origin URL</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter link origin url' {...field} />
                        </FormControl>
                        <FormDescription>
                            {`Suppose this your link url "https://abc.com/page1/page2" then te origin url is "https://abc.com"`}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="content.favicon"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Link URL</FormLabel>
                        <FormControl>
                            <Input placeholder='Enter site favicon url' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

export default MutateLinkItem