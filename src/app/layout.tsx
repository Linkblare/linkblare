import "@/styles/globals.css";
import '@/styles/react-tag-autocomplete.css'

import { GeistSans } from 'geist/font/sans'
import { headers } from "next/headers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import {Analytics as VercelAnalytics} from '@vercel/analytics/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { type Metadata } from "next";
import { Suspense } from "react";
import Analytics from "@/components/utils/GoogleTagmanager";
import { env } from "@/env.mjs";




export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: "LinkBlare - Unleashing the Power of Web Resources",
  description: "Discover LinkBlare, your go-to source for curated web resources. From free illustrations to essential development tools, find what you need for seamless online experiences. Elevate your projects with LinkBlare's handpicked collections.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
  ],
  openGraph:{
    type: "website",
    locale: "en_IN",
    url: env.SITE_URL,
    siteName: "LinkBlare",
    images: [
      {
        url: `${env.SITE_URL}/api/og/LinkBlare - Unleashing the Power of Web Resources`,
        width: 1200,
        height: 630,
        alt: "LinkBlare",
        type: "image/png",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${GeistSans.className} overflow-x-hidden max-w-[1920px] mx-auto`}>
        <Suspense><Analytics /></Suspense>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        <Toaster />
        <VercelAnalytics/>
      </body>
    </html>
  );
}
