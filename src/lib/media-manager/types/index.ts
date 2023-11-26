/* eslint-disable @typescript-eslint/no-explicit-any */
type FileType = 'image' | 'video' | 'pdf' | 'json';

type UploadMediaResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
    
};

type MediaManagerResponse<T> = {
    success: boolean;
    message?: string;
    data?: T;
    error?: Error
  };
  
  type UploadResponse = {
    publicUrl: string;
    fileId: string;
    // Add other upload response properties as needed
  };
  
  type DeleteMediaResponse = {
    publicUrl: string;
    fileId: string;
    // Define properties specific to delete operation
  };

  type MediaListResponse = any

type SizeLimit = Record<FileType, number>;

type Options = {
    sizeLimit: SizeLimit;
    supportedMimeTypes: Record<FileType, string[]>;
    // Add other options as needed
};

type Driver = {
    upload: (file: File) => Promise<MediaManagerResponse<any>>;
    delete: (id: string) => Promise<MediaManagerResponse<any>>;
    list: (options?: {take?: number, offset?: number}) => Promise<MediaManagerResponse<MediaListResponse>>
};

export type {Options, Driver, SizeLimit, MediaManagerResponse, UploadResponse, DeleteMediaResponse, FileType, MediaListResponse}
