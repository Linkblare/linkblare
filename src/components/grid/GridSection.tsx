import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type GridSectionProps = {
  loading?: boolean,
  loader?: ReactNode,
} & React.HTMLAttributes<HTMLDivElement>

const GridSection = React.forwardRef<HTMLDivElement, GridSectionProps>(({
  loading,
  loader,
  children,
  ...props
  }, ref) => {
    return (
    <div 
    className={cn([
      'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center justify-center',
      props.className
    ])}
    ref={ref} 
    {...props}
    >
      {loading && loader}
      {children}
    </div>
  )
})

GridSection.displayName = "Grid Section"

export default GridSection