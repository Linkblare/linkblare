/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createPaginator } from 'prisma-pagination'
import { ZodError, z } from "zod"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { nanoid } from "nanoid";
import slugify from "slugify";
import { Md5 } from 'ts-md5'

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const paginate = createPaginator({ perPage: 20 })

export function convertNullToUndefined(obj: any): any {
  if (obj === null) {
    return undefined;
  }

  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map((value) => convertNullToUndefined(value));
    }

    const convertedObj: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        convertedObj[key] = convertNullToUndefined(obj[key]);
      }
    }

    return convertedObj;
  }

  return obj;
}


export function formateDate(date: number | Date | undefined | string) {
  return new Intl.DateTimeFormat('en-US').format(date ? new Date(date) : undefined)
}

export function getRandomEnumValue<T extends ArrayLike<any>>(enumeration: T): T[keyof T] {
  const values = Object.values(enumeration);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export function getRandomArrayElement<T>(data: T[]) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

export function groupIntoRows<T>(data: T[], itemsPerRow: number): T[][] {
  const rows: T[][] = [];

  for (let i = 0; i < data.length; i += itemsPerRow) {
    const row = data.slice(i, i + itemsPerRow);
    rows.push(row);
  }

  return rows;
}


export function isValidImageFile(
  file: File,
  options: {
    validImageFileExtensions?: string[]
  } = { validImageFileExtensions: ["jpg", "jpeg", "png", "gif", "bmp", "webp"] }) {

  if (!file) {
    return false;
  }

  const fileName = file.name;
  const fileExtension = fileName.split(".").pop();

  if (!fileExtension) {
    return false;
  }

  const lowerCaseExtension = fileExtension.toLowerCase();

  return options.validImageFileExtensions?.includes(lowerCaseExtension);

}


export function isFileSizeWithinLimit(file: File, maxSizeInBytes: number): boolean {
  if (!file) {
    return false;
  }

  return file.size <= maxSizeInBytes;
}

export function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

export function extractOrigin(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    return url.origin;
  } catch (error) {
    // Handle invalid URL or other errors
    console.error('Invalid URL:', urlString);
    return null;
  }
}

export async function getFaviconUrl(url: string): Promise<string | null> {

  try {
    // const encodedUrl = encodeURIComponent(url);
    if (!isValidUrl(url)) return null;
    const response = await fetch(`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=16`);

    if (response.ok) {
      return response.url;
    } else {
      return null; // Favicon not found or other error
    }
  } catch (error) {
    console.error('Error fetching the favicon:', error);
    return null;
  }
}


export const validateParams = <T>(obj: T, schema: z.Schema): { data?: z.TypeOf<typeof schema>, error?: ZodError } => {
  try {
    const result = schema.parse(obj);
    return {
      data: result,
      error: undefined
    }
  } catch (error: any) {
    return {
      data: undefined,
      error: error as ZodError
    }
  }
}


export const dateFromNow = (date: Date) => {
  return dayjs(date).fromNow();
}

export async function fetchPdfFile(url: string, options: { fileName?: string } = { fileName: `${nanoid()}.pdf` }): Promise<File | null> {

  try {
    // check if url is valid
    if (!isValidUrl(url)) throw new Error("Invalid url")
    // Fetch the URL content
    const response = await fetch(url);

    if (response.ok) {
      // Check if the Content-Type is a PDF type
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.toLowerCase().includes('application/pdf')) {
        const pdfBlob = await response.blob();
        const pdfFile = new File([pdfBlob], (options.fileName ?? 'document.pdf'), { type: contentType });
        return pdfFile;
      } else {
        console.error('The content at the provided URL is not a PDF.');
        return null;
      }
    } else {
      console.error('Error fetching content:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}



export enum SocialMedia {
  Facebook = 'facebook',
  Instagram = 'instagram',
  LinkedIn = 'linkedin',
  TikTok = 'tiktok',
  Twitter = 'twitter',
  YouTube = 'youtube',
}

export function getSocialMediaFromUrl(url: string): SocialMedia | undefined {
  const socialMediaPatterns: { [key in SocialMedia]: RegExp } = {
    [SocialMedia.Facebook]: /^https?:\/\/(www\.)?facebook\.com\/.*/,
    [SocialMedia.Instagram]: /^https?:\/\/(www\.)?instagram\.com\/.*/,
    [SocialMedia.LinkedIn]: /^https?:\/\/(www\.)?linkedin\.com\/.*/,
    [SocialMedia.TikTok]: /^https?:\/\/(www\.)?tiktok\.com\/.*/,
    [SocialMedia.Twitter]: /^https?:\/\/(www\.)?x\.com\/.*/,
    [SocialMedia.YouTube]: /^https?:\/\/(www\.)?(youtube\.com\/|youtu\.be\/).*/,
  };

  for (const [site, pattern] of Object.entries(socialMediaPatterns)) {
    if (pattern.test(url)) {
      return site as SocialMedia;
    }
  }

  return undefined;
}

export function getPlaceholderImage({
  config
}: {
  config?: {
    width?: number,
    height?: number,
    text?: string
  }
}) {
  config = { ...{ width: 800 }, ...config }
  return `https://placehold.co/${config?.width}${config?.height ? `x${config?.height}` : ''}?${config?.text ? `font=${config?.text.replaceAll(' ', '+')}` : ''}`
}

export function getSlug(text: string) {
  return slugify(text.toLowerCase());
}

export function md5Hash(text: string) {
  return Md5.hashStr(text)
}

export function appendQueryInSearchParams(searchString: string, query: { key: string, value: string }, toggleMode = false) {
  const params = new URLSearchParams(searchString);
  if (params.has(query.key, query.value)) {
    if (toggleMode) {
      params.delete(query.key, query.value)
    }
  } else {
    params.append(query.key, query.value);
  }
  return params.toString();
}


export function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '');
}

export function isDateBeforeNow(startDate: Date, offset: number): boolean {
  const targetDate = new Date(startDate.getTime() + offset * 24 * 60 * 60 * 1000); // Adding offset in milliseconds

  return targetDate < new Date();
}

export function formatNumberInternationally(num: number): string {
  const absNum = Math.abs(num);

  if (absNum >= 1e6) {
    return (absNum / 1e6).toFixed(1) + 'M';
  } else if (absNum >= 1e3) {
    return (absNum / 1e3).toFixed(1) + 'k';
  }

  return num.toString();
}








