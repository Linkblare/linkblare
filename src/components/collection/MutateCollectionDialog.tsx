'use client'
import React, {
     ReactNode, 
     useState 
    } from 'react'
import { 
    Dialog, 
    DialogHeader, 
    DialogTrigger, 
    DialogContent, 
    DialogTitle 
} from '../ui/dialog'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import MutateCollectionForm from './MutateCollectionForm'
import { CollectionOut } from '@/schema/collection-schema'

type MutateCollectionDialogProps = {
    trigger?: ReactNode,
    data?: CollectionOut
}

const MutateCollectionDialog = ({
    trigger,
    data
}: MutateCollectionDialogProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}> 
            <DialogTrigger asChild>{trigger || <Button> <PlusIcon className='w-5 h-5' /> <span>New</span></Button>}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Mutate Collection</DialogTitle>
                </DialogHeader>
                <MutateCollectionForm data={data} onDone={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

export default MutateCollectionDialog