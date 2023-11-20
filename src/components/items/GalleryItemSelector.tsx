'use client'

import React, { useEffect, useState } from 'react'
import FileUpload from '../FileUpload';
import { PlusCircle } from 'lucide-react';
import { nanoid } from 'nanoid';

type GalleryItemSelectorProps = {
    value?: string[],
    onChange?: (values: string[]) => void
}

const GalleryItemSelector = ({
    value,
    onChange
}: GalleryItemSelectorProps) => {
    const [images, setImages] = useState<string[]>(value ?? []);

    const handleFileChange = (url: string | undefined) => {
        if (!url) return;
        setImages(prev => [...prev.filter(im => im !== ''), url])
    }

    const handleFileRemove = (url: string) => {
        setImages(prev => prev.filter(value => value !== url));
    }

    const add = () => {
        setImages(prev => [...prev, ''])
    }

    useEffect(() => {
        onChange?.(images)
    }, [images]);
    return (
        <div className='grid grid-cols-3 gap-5'>
            {
                images.map(img => <FileUpload key={nanoid()} value={img} onChange={handleFileChange} onRemoveSuccess={handleFileRemove} />)
            }
            <div
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
                <PlusCircle onClick={add} className='w-10 h-10 text-muted-foreground' />
            </div>
        </div>
    )
}

export default GalleryItemSelector