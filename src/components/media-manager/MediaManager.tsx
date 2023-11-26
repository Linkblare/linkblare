/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'
import { Dialog } from '../ui/dialog';
import { FileType } from '@/lib/media-manager/types';

export type MediaType = 'images'|'video'|'pdf';

export type MediaResponse<T = any> = {
    id: string,
    type: MediaType,
    publicUrl: string,
    meta?: T
}

type MediaManagerProps = {
    onSelect?: (result: string|string[]) => void,
    isMultiSelect?: boolean,
    trigger?: ReactNode,
    type?: 'all'|FileType
}

const MediaManager = () => {
  return (
    <Dialog></Dialog>
  )
}

export default MediaManager