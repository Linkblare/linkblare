/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FileUploadResponse, imageRemove, imageUpload } from '@/lib/fileUpload'
import React, { useEffect, useState } from 'react'
import { useToast } from './ui/use-toast'
import { nanoid } from 'nanoid'
import { Button } from './ui/button'
import { Delete } from 'lucide-react'
import Loading from './Loading'

type FileUploadProps = {
  onUploadSuccess?: (response: FileUploadResponse) => void,
  value?: string,
  onChange?: (imgUrl: string | undefined) => void,
  onUploadError?: (error: any) => void;
  onRemoveSuccess?: (url: string) => void
}


const FileUpload = ({
  onUploadSuccess,
  value,
  onChange,
  onUploadError,
  onRemoveSuccess,
}: FileUploadProps) => {

  const [previewImage, setPreviewImage] = useState<any>(value);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()
  const id = nanoid()


  const upload = async (file: File) => {
    try {
      setLoading(true);
      const res = await imageUpload(file);
      const url = res.data?.url;
      onUploadSuccess?.(res);
      onChange?.(url);
      setPreviewImage(url);
    } catch (error: any) {
      toast({
        title: 'Error in Uploading file!!',
        description: error.message
      });
      onUploadError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const remove = async (url: string) => {

    try {
      setLoading(true);
      const res = await imageRemove([url]);
      onChange?.(undefined);
      onRemoveSuccess?.(url);
    } catch (error: any) {
      toast({
        title: 'Error in removing file!!',
        description: error.message
      });
    } finally {
      setLoading(false)
    }
  }


  const onChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (files === null || files.length <= 0 || loading) return;
    void upload(files[0]!)
  }

  const handleRemove = () => {
    if (!value || loading) return;
    void remove(value)
  }


  useEffect(() => {
    setPreviewImage(value)
  }, [value])
  

  if(loading){
    return (
      <div
      className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
      >
        <Loading/>
      </div>
    )
  }


  return (
    <div>
      <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        {
          (previewImage) && !loading ?
            <div className='w-full h-full bg-center bg-contain bg-no-repeat ' style={{ backgroundImage: `url(${previewImage})` }}>
              <div className="w-full h-full flex items-center justify-center group gap-3 hover:backdrop-blur-sm transition-all duration-300">
                <Button variant={'secondary'} className='pointer-events-none group-hover:opacity-100 opacity-0 transition-all duration-300'>Change</Button>
                {
                  value && <Button onClick={handleRemove} variant={'destructive'} className='group-hover:opacity-100 opacity-0 transition-all duration-300'><Delete className='w-5 h-5' /></Button>
                }
              </div>
            </div>
            :
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
            </div>
        }
        <input id={id} type="file" className="hidden" onChange={onChangeHandler} />
      </label>
    </div>
  )
}

export default FileUpload