import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type MainWrapperProps = {
    className?: string
} & PropsWithChildren

const MainWrapper = ({children, className}: MainWrapperProps) => {
  return (
    <div className={cn([
        'max-w-[1920px] px-5',
        className
    ])}>{children}</div>
  )
}

export default MainWrapper