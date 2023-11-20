/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
// import { Document, Page } from 'react-pdf';
import { useToast } from '../ui/use-toast';
import { fetchPdfFile } from '@/lib/utils';
import { Button } from '../ui/button';
import { FileText } from 'lucide-react';

const PdfViewerSheet = ({
    url
}: {
    url: string
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {toast} = useToast();

    const load = async (url: string) => {
        setLoading(true);
        try {
            const res = await fetchPdfFile(url);
            setFile(res)
        } catch (error: any) {
            toast({
                title: 'Error in loading pdf',
                description: error.message,
                variant: 'destructive'
            })
        } finally{
            setLoading(true);
        }
    }

    useEffect(() => {
      void load(url)
    }, [url])
    

    
  return (
    <Sheet>
        <SheetTrigger asChild><Button variant={'ghost'} size={'icon'}><FileText className='w-5 h-5 text-muted-foreground' /></Button></SheetTrigger>
        <SheetHeader></SheetHeader>

        <SheetContent>
            
            
        </SheetContent>
    </Sheet>
  )
}

export default PdfViewerSheet