/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from "@/trpc/server";
import { type MetadataRoute } from "next";

const siteUrl = 'https://linkblare.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const collections = await api.collection.list.query({pagination: {perPage: 1000}});
    const items = await api.items.list.query({pagination: {perPage: 1000}});
    const sitemapData: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            changeFrequency: 'yearly',
            priority: 1
        }
    ];
    
    collections.data.forEach(collection => {
        sitemapData.push({
            url: `${siteUrl}/${collection?.slug!}`,
            lastModified: collection.updatedAt,
            changeFrequency: 'daily',
            priority: 1
        })
    });
    items.data.forEach(item => {
        sitemapData.push({
            url: `${siteUrl}/items/${item?.slug!}`,
            lastModified: item.updatedAt,
            changeFrequency: 'daily',
            priority: 1
        })
    });

    return sitemapData;
}