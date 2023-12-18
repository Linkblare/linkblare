'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ItemOut } from "@/schema/item-schema"
import React, {useContext} from "react"

export type CopyMoveContextType<T = any> = {
    moveItems: T[]
    setMoveItems: (items: T[]) => void,
    action: 'copy' | 'move',
    setAction: (action: 'copy' | 'move') => void,
    fromCollectionId: number
    setFromCollectionId: (id: number) => void
}


export const CopyMoveContext = React.createContext<CopyMoveContextType>({} as CopyMoveContextType)

export const CopyMoveContextProvider = (props: {children: React.ReactNode}) => {
    const [moveItems, setMoveItems] = React.useState<any[]>([])
    const [action, setAction] = React.useState<'copy' | 'move'>('copy')
    const [fromCollectionId, setFromCollectionId] = React.useState<number>(0)

    return (
        <CopyMoveContext.Provider value={{moveItems, setMoveItems, action, setAction, fromCollectionId, setFromCollectionId}}>
            {props.children}
        </CopyMoveContext.Provider>
    )
}

export const useCopyMoveContext = () => {
    return useContext(CopyMoveContext)
}