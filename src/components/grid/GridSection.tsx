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
        'grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center max-w-[1200px] mx-auto',
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