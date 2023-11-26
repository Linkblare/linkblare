/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { nanoid } from "nanoid"
import { SupabaseStorage, getSupabseUploadUrl } from "./supabase"
import { isFileSizeWithinLimit, isValidImageFile } from "./utils"

export type FileUploadResponse = {
    data: {
        url: string
    } | null,
    error?: any | null
}
export type FileRemoveResponse = {
    data: {
        url: string
    } | null,
    error?: any | null
}

export type Uploader = (file: File) => Promise<{ data: any, error: any }>

export async function imageUpload(file: File, option?: { filePath?: string }): Promise<FileUploadResponse> {
    const fileExt = file.name.split('.').pop()
    const fp = option?.filePath ?? `${nanoid(5)}-${Math.random()}.${fileExt!}`

    // CHECK IF IT IS IMAGE FILE AND VALID IMAGE FILE
    if(!isValidImageFile(file)){
        throw new Error("Invalid image file")
    }

    // check if image file size is in limit
    if(!isFileSizeWithinLimit(file, 1024*1024*5)){
        throw new Error("File size limit")
    }

    const result = await SupabaseStorage.upload(fp, file);

    if (result.error) {
        throw result.error;
    }
    return {
        data: {
            url: getSupabseUploadUrl(result.data.path)
        }
    }
}

export async function imageRemove(urls: string[]) {
    const paths = urls.map(url => {
        const arr = url.split('/');
        if(arr.length === 1){
            return arr[0]!
        }
        return arr[arr.length-1]!
    })
    const result = await SupabaseStorage.remove(paths);
    if (result.error) {
        throw result.error
    }
    return;
}