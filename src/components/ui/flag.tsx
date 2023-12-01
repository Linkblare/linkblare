import React, { ReactNode } from 'react'
import { Badge } from './badge'

const Flag = ({
    children
}: {
    children: ReactNode
}) => {
  return (
    <Badge>{children}</Badge>
  )
}

export default Flag