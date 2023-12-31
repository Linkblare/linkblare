/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { type MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL ?? "https://linkblare.interlef.com";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const collections = await db.collection.findMany()
    const items = await db.item.findMany();
    const sitemapData: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            changeFrequency: 'yearly',
            priority: 1
        }
    ];
    
    collections.forEach(collection => {
        sitemapData.push({
            url: `${siteUrl}/${collection?.slug!}`,
            lastModified: collection.updatedAt,
            changeFrequency: 'daily',
            priority: 1
        })
    });
    items.forEach(item => {
        sitemapData.push({
            url: `${siteUrl}/items/${item?.slug!}`,
            lastModified: item.updatedAt,
            changeFrequency: 'daily',
            priority: 1
        })
    });

    return sitemapData;
}