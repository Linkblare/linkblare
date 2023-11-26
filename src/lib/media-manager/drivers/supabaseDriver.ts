/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// supabaseDriver.ts

import { SupabaseClient } from '@supabase/supabase-js';

import Supabase, { DefaultBucket } from '@/lib/supabase';
import { MediaManagerResponse, UploadResponse, Driver, DeleteMediaResponse, MediaListResponse } from '../types';
import { nanoid } from 'nanoid';

class SupabaseDriver implements Driver {
  private supabase: SupabaseClient;
  private storageBucket: string;

  constructor(supabase: SupabaseClient, storageBucket: string) {
    this.supabase = supabase;
    this.storageBucket = storageBucket;
  }

  private getStoragePath(filePath: string): string {
    return `${this.storageBucket}/${filePath}`;
  }

  private getPublicUrl(path: string): string{
    return this.supabase.storage.from(this.storageBucket).getPublicUrl(path).data.publicUrl
  }

  private generatePathFromFile(file: File): string{
    const fileExt = file.name.split('.').pop()
    return `${nanoid(5)}-${Math.random()}.${fileExt!}`
  }

  async upload(file: File): Promise<MediaManagerResponse<UploadResponse>> {
    // Implement Supabase-specific upload logic
    try {
      const response = await this.supabase.storage
        .from(this.storageBucket)
        .upload(this.getStoragePath(this.generatePathFromFile(file)), file);

      if (response.error) {
        return { success: false, message: 'Error uploading file to Supabase', error: new Error(response.error.message)} ;
      }
      // You can handle the response based on your needs
      return { 
        success: true, 
        message: 'Supabase upload successful', 
        data: {
          publicUrl: this.getPublicUrl(response.data.path), 
          fileId: response.data.path
        } 
      };
    } catch (error: any) {
      console.error('Error during Supabase upload:', error);
      return { success: false, message: 'Error during Supabase upload', error };
    }
  }


  async delete(filePaths: string | string[]): Promise<MediaManagerResponse<any>> {
    try {
      const pathsToDelete = Array.isArray(filePaths) ? filePaths : [filePaths];

      const { data, error } = await this.supabase.storage
        .from(this.storageBucket)
        .remove(pathsToDelete);

      if (error) {
        return { success: false, message: 'Error deleting file(s) from Supabase storage' };
      }

      // You can handle the response based on your needs
      return { success: true, message: 'Supabase file(s) deletion successful'};
    } catch (error: any) {
      console.error('Error during Supabase file(s) deletion:', error);
      return { success: false, message: 'Error during Supabase file(s) deletion', error };
    }
  }

  async renameFile(oldFilePath: string, newFilePath: string): Promise<MediaManagerResponse<any>> {
    // Implement Supabase-specific file renaming logic
    // This may involve copying the file to a new location and then deleting the old file
    try {
      const { data: copyData, error: copyError } = await this.supabase.storage
        .from(this.storageBucket)
        .move(this.getStoragePath(oldFilePath), this.getStoragePath(newFilePath));

      if (copyError) {
        return { success: false, message: 'Error renaming file in Supabase storage' };
      }

      const { data: removeData, error: removeError } = await this.supabase.storage
        .from(this.storageBucket)
        .remove([this.getStoragePath(oldFilePath)]);

      if (removeError) {
        return { success: false, message: 'Error deleting old file during rename in Supabase storage' };
      }

      // You can handle the response based on your needs
      return { success: true, message: 'Supabase file rename successful', data: { copyData, removeData } };
    } catch (error: any) {
      console.error('Error during Supabase file rename:', error);
      return { success: false, message: 'Error during Supabase file rename', error };
    }
  }


  // CURRENTLY WORKING ON
  async list(providedOptions?: { take?: number; offset?: number }): Promise<MediaManagerResponse<MediaListResponse>> {
    const options: { take: number; offset: number } = {...{take: 100, offset: 0}, ...providedOptions}
    try {
      const { data, error, } = await this.supabase.storage
        .from(this.storageBucket)
        .list();

      if (error) {
        return { success: false, message: 'Error listing files in Supabase storage' };
      }

      // Extract relevant data from the list response
      const mediaList: MediaListResponse = {
        data: data?.map((item) => ({ publicUrl: this.supabase.storage.from(this.storageBucket).getPublicUrl(item.id), id: item.id })) || [],
        nextOffset: options.offset || null,
      };

      return { success: true, message: 'Supabase file listing successful', data: mediaList };
    } catch (error: any) {
      console.error('Error during Supabase file listing:', error);
      return { success: false, message: 'Error during Supabase file listing', error };
    }
  }

}

export default SupabaseDriver;


export const supabaseDriver  = new SupabaseDriver(Supabase, DefaultBucket);
