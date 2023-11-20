import React, { type ReactNode } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button'
import { InfoIcon } from 'lucide-react'

const InfoDialog = ({
    children,
    triggre,
    title
}: {
    children?: ReactNode,
    triggre?: ReactNode,
    title?: string
}) => {
  return (
    <Dialog>
        <DialogTrigger>{triggre ?? <Button variant={'ghost'} size={'icon'}><InfoIcon className='w-5 h-5' /></Button>}</DialogTrigger>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          {children}
        </DialogContent>
    </Dialog>
  )
}

export default InfoDialog