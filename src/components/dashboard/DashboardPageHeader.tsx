import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

 type HeaderProps = {
    className?: string,
    children?: ReactNode,
    title: string
}

const DashboardPageHeader = ({
  className,
  children,
  title
}: HeaderProps) => {
  return (
    <div 
    className={cn([
      'flex items-center p-5 bg-slate-50 rounded-lg my-5 border ',
      className
    ])} > 
      <div className='shrink-0 text-3xl font-bold flex-grow-0'>
        <h1 className='text-3xl font-bold'>{title}</h1>
      </div>
      {children}
    </div>
  )
}

export default DashboardPageHeader