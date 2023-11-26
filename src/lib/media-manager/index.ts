/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DefaultBucket } from "../supabase";
import { supabaseDriver } from "./drivers/supabaseDriver";
import { type Driver, type FileType, type MediaManagerResponse, type Options, type UploadResponse } from "./types";


const defaultOptions: Options = {
    sizeLimit: { 'image': 1024 * 1024, 'video': 2048 * 1024, 'pdf': 2048 * 1024, 'json': 2048 * 1024 },
    supportedMimeTypes: {
        'image': ['image/jpeg', 'image/png'],
        'video': ['video/mp4', 'video/webm'],
        'pdf': ['application/pdf'],
        'json': ['application/json'],
    },
};



function mergeOptions(defaultOptions: Options, providedOptions?: Partial<Options>): Options {
    return {
        ...defaultOptions,
        ...providedOptions,
    };
}

export function getFileTypeFromMimeType(mimeType: string): FileType | undefined {
    const lowerCaseMimeType = mimeType.toLowerCase();

    if (lowerCaseMimeType.startsWith('image/')) {
        return 'image';
    } else if (lowerCaseMimeType.startsWith('video/')) {
        return 'video';
    } else if (lowerCaseMimeType === 'application/pdf') {
        return 'pdf';
    } else if (lowerCaseMimeType === 'application/json') {
        return 'json';
    }
    return undefined;
}

function isSupportedFileType(fileType: FileType, options: Options): boolean {
    return options.supportedMimeTypes[fileType] !== undefined;
}

function isWithinSizeLimit(file: File, fileType: FileType, options: Options): boolean {
    const fileSizeLimit = options.sizeLimit[fileType];
    return fileSizeLimit !== undefined && file.size <= fileSizeLimit;
}

async function uploadMedia(file: File, providedOptions?: Partial<Options>, providedDriver?: Driver): Promise<MediaManagerResponse<UploadResponse>> {
    const options = mergeOptions(defaultOptions, providedOptions);
    const driver = providedDriver ?? supabaseDriver;
    const fileType: FileType | undefined = getFileTypeFromMimeType(file.type); // Replace with your logic to determine the file type

    if (!fileType || !isSupportedFileType(fileType, options)) {
        return { success: false, message: 'Unsupported file type' };
    }

    if (!isWithinSizeLimit(file, fileType, options)) {
        return { success: false, message: 'File size exceeds the limit' };
    }

    return await driver.upload(file);
}









