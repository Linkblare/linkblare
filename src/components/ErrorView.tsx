import { cn } from '@/lib/utils'
import { InfoIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

const ErrorView = ({
    icon = <InfoIcon className='w-16 h-16 text-primary'/>,
    title = 'Something went wrong!!',
    subTitle,
    className
}: {
  title?: string,
  icon?: ReactNode,
  subTitle?: string,
  className?: string
}) => {
  return (
    <div className={cn([
      'w-full h-screen flex items-center justify-center',
      className
    ])}>
        <div className='space-y-3 max-w-lg text-center'>
          <div className="flex items-center justify-center">{icon}</div>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <p className='text-muted-foreground'>{subTitle}</p>
        </div>
    </div>
  )
}

export default ErrorView