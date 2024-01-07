import React from 'react'
import { buttonVariants } from './ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import BmcButton from './BmcButton'

const Footer = () => {
  return (
    <footer className=' w-full px-5 py-2 bg-card mb-12 lg:mb-0'>
       <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
            <Link 
            className={cn([buttonVariants({variant: 'outline'})])} 
            href={'https://github.com/Linkblare/linkblare'} 
            ><Github/></Link>
        </div>

        <div>
            <p>
               Made with ❤️ by India
            </p>
        </div>

        <div>
            <BmcButton/>
        </div>
       </div>
    </footer>
  )
}

export default Footer