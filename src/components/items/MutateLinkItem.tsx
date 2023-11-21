/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { Input } from '../ui/input'
import { extractOrigin, getFaviconUrl, isValidUrl } from '@/lib/utils'
import { Switch } from '../ui/switch'

const MutateLinkItem = ({
    form
}: {
    form: UseFormReturn<any>
}) => {

    const urlWatch = useWatch({ control: form.control, name: ['content.url'] })
    const [autoUpdate, setAutoUpdate] = useState<{ favicon: boolean, origin: boolean }>({ favicon: true, origin: true });

    const setFaviconUrl = async (url: string) => {
        const favUrl = await getFaviconUrl(url);
        if (!favUrl || favUrl === null) {
            return form.setValue('content.favicon', undefined);
        }
        return form.setValue('content.favicon', favUrl);
    }
    const setOrginUrl = (url: string) => {
        const orgUrl = extractOrigin(url);
        if (!orgUrl || orgUrl === null) {
            return form.setValue('content.originUrl', undefined);
        }
        return form.setValue('content.originUrl', orgUrl);
    }

    useEffect(() => {
        const value = urlWatch[0] as string | undefined;
        if (value && isValidUrl(value)) {
            // if (autoUpdate.favicon) {
            //     void setFaviconUrl(value)
            // }
            if(autoUpdate.origin){
                void setOrginUrl(value)
            }
        }
    }, [urlWatch])


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
            <div className='space-y-2'>
                <FormField
                    disabled={autoUpdate.origin}
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

                <div className='flex items-center gap-5'>
                    <Switch checked={autoUpdate.origin} onCheckedChange={val => setAutoUpdate(prev => ({ ...prev, origin: val }))} />
                    <FormDescription>
                        {autoUpdate.origin ? 'Auto Update Enabled' : 'Auto Update Disabled'}
                    </FormDescription>
                </div>
            </div>
            <div className='space-y-2'>
                <FormField
                    disabled={autoUpdate.favicon}
                    name="content.favicon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Favicon URL</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter site favicon url' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex items-center gap-5'>
                    <Switch checked={autoUpdate.favicon} onCheckedChange={val => setAutoUpdate(prev => ({ ...prev, favicon: val }))} />
                    <FormDescription>
                        {autoUpdate.favicon ? 'Auto Update Enabled' : 'Auto Update Disabled'}
                    </FormDescription>
                </div>
            </div>
        </>
    )
}

export default MutateLinkItem