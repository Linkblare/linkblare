/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { db } from '@/server/db';
import { api } from '@/trpc/server';
import { getServerSideSitemap, ISitemapField} from 'next-sitemap'
const siteUrl = process.env.SITE_URL ?? "https://linkblare.interlef.com";

export async function GET(request: Request) {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    const collections = await db.collection.findMany();
    // const items = await api.items.list.query({ pagination: { perPage: 1000 } });

    const sitemapData: ISitemapField[] = [
        {
            loc: siteUrl,
            changefreq: 'yearly',
            priority: 1,
            lastmod: new Date().toISOString(),
        }
    ];

    collections.forEach(collection => {
        sitemapData.push({
            loc: `${siteUrl}/${collection?.slug!}`,
            lastmod: collection.updatedAt.toISOString(),
            changefreq: 'monthly',
            priority: 1
        })
    });
    // items.data.forEach(item => {
    //     sitemapData.push({
    //         loc: `${siteUrl}/items/${item?.slug!}`,
    //         lastmod: item.updatedAt.toISOString(),
    //         changefreq: 'monthly',
    //         priority: 1
    //     })
    // });

    return getServerSideSitemap(sitemapData)
}