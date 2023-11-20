import React, { ReactNode } from 'react'

const Loading = ({
    children
}: { children: ReactNode }) => {
    return (
        <div className=''>
            {children}
        </div>
    )
}

export default Loading