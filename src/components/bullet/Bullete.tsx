/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { type CollectionOut } from '@/schema/collection-schema'
import { type CreateItemInput, CreateItemSchema, SingleItemOut } from '@/schema/item-schema'
import React, { useEffect, useState } from 'react'
import { CollectionComboBox } from '../collection/CollectionComboBox'
import JsonFileInput from '../ui/json-file-input'
import { z } from 'zod'
import { api } from '@/trpc/react'
import { Button } from '../ui/button'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { extractOrigin, getGoogleFaviconUrl } from '@/lib/utils'
import MutateItem from './MutateItem'


const RawJsonData = z.object({
    title: z.string(),
    description: z.string(),
    shortDesc: z.string().optional(),
    collectionId: z.number().optional(),
    tags: z.string(),
})

const JsonDataSchema = z.array(RawJsonData)


const Bullete = () => {
    const [selectedCollection, setSelectedCollection] = useState<CollectionOut | null>(null)
    const [statistics, setStatistics] = useState<{
        total: number;
        success: number;
        failed: number;
    }>({
        total: 0,
        success: 0,
        failed: 0
    })
    const [data, setData] = useState<z.TypeOf<typeof RawJsonData>[]>([]);
    const [count, setCount] = useState<number>(0);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [running, setRunning] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [executedItems, setExecutedItems] = useState<{
        status: 'success' | 'failed' | 'idle';
        input: CreateItemInput;
        data: SingleItemOut | null
    }[]>([]);



    const handleDataChange = (data: any) => {
        const result = JsonDataSchema.safeParse(data);
        setError(null);
        if (!result.success) {
            setError(result.error.message);
            setData([]);
            return;
        }
        setData(result.data);
    }


    const start = () => {
        if (!selectedCollection) {
            setError('Please select a collection');
            return;
        }
        if (data.length === 0) {
            setError('Data is empty');
            return;
        }
        setError(null);
        setStatus('loading');
        setRunning(true);
        setCount(0);
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        console.log({running})
        if (running) {
            interval = setInterval(() => {
                if (count < data.length) {
                    const item = data[count];
                    setExecutedItems(prev => [...prev, {
                        status: 'idle',
                        input: normalizeToInput(item!),
                        data: null
                    }])
                    setCount((prevCount) => prevCount + 1);
                } else {
                    setRunning(false);
                    setStatus('success')
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [count, running, data.length]);

    const normalizeToInput = (item: z.TypeOf<typeof RawJsonData>): CreateItemInput => {
        return {
            title: item.title,
            description: item.description,
            shortDesc: item.shortDesc,
            collectionId: item.collectionId ?? selectedCollection?.id!,
            slug: slugify(item.title, { lower: true }),
            tags: JSON.parse(item.tags) as string[],
            type: 'link',
        }
    }

return (
    <div>
        {
            error && (
                <div className="bg-red-500 text-white p-3">
                    {error}
                </div>
            )

        }
        <div className="flex items-center gap-5 max-w-[1200px] p-5 mx-auto border bg-card">
            <CollectionComboBox onValueChange={(val) => {
                setSelectedCollection(val);
            }} />
            <JsonFileInput onDataChange={handleDataChange} />

            <Button disabled={running} onClick={() => start()}>Start</Button>
        </div>

        <div>
            {
                executedItems.map(item => (
                    <div key={nanoid()}>
                        <MutateItem input={item.input} />
                    </div>
                ))
            }
        </div>
    </div>
)
}

export default Bullete