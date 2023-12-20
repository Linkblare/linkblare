import React from 'react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Share2Icon } from 'lucide-react'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon} from 'next-share'
import { env } from '@/env.mjs'
import { getDefaultThumnail } from '@/lib/utils'

const ShareDropdown = ({
    url = '',
    title = '',
    description = '',
    tags = [],
    image = getDefaultThumnail('')
}: {
    url?: string,
    title?: string,
    description?: string,
    tags?: string[],
    image?: string,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} size={'sm'}><Share2Icon className='w-5 h-5' /></Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem>
                    <FacebookShareButton
                        url={url}
                        quote={title}
                        hashtag={tags.join(',')}
                        className='flex'
                    > 
                    <span className='flex items-center justify-center gap-2'>
                        <span><FacebookIcon className='w-4 h-4'/></span>
                        <span>Facebook</span>
                    </span>
                    </FacebookShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <TwitterShareButton
                        url={url}
                        title={title}
                        hashtags={tags}
                        className='flex'
                    > 
                    <span className='flex items-center justify-center gap-2'>
                        <span><TwitterIcon className='w-4 h-4'/></span>
                        <span>X</span>
                    </span>
                    </TwitterShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LinkedinShareButton
                        url={url}
                        title={title}
                        className='flex'
                    > 
                    <span className='flex items-center justify-center gap-2'>
                        <span><LinkedinIcon className='w-4 h-4'/></span>
                        <span>Linkedin</span>
                    </span>
                    </LinkedinShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <WhatsappShareButton
                        url={url}
                        title={title}
                        separator={'\n'}
                        className='flex'
                    > 
                    <span className='flex items-center justify-center gap-2'>
                        <span><WhatsappIcon className='w-4 h-4'/></span>
                        <span>Whatsapp</span>
                    </span>
                    </WhatsappShareButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ShareDropdown