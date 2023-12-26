/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Label } from './label'
import { Input } from './input'
import { parseJsonFile } from '@/lib/utils'

export interface JsonFileInputProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string,
    onDataChange?: (data: any) => void
}


const JsonFileInput = (props: JsonFileInputProps) => {

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event);
        if (event.target.files) {
            const file = event.target.files[0];
            if(file){
                const data = await parseJsonFile(file);
                props.onDataChange?.(data)
            }
        }
    }
    return (
        <div>
            
            <Input id="json-input" type="file" accept=".json" onChange={handleFileChange} />
        </div>
    )
}

export default JsonFileInput