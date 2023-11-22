import "@/styles/globals.css";

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
import { Metadata } from "next";
import { Suspense } from "react";
import Analytics from "@/components/utils/GoogleTagmanager";




export const metadata: Metadata = {
  title: "LinkBlare - Unleashing the Power of Web Resources",
  description: "Discover LinkBlare, your go-to source for curated web resources. From free illustrations to essential development tools, find what you need for seamless online experiences. Elevate your projects with LinkBlare's handpicked collections.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${GeistSans.className} overflow-x-hidden`}>
        <Suspense><Analytics /></Suspense>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        <Toaster />
        <VercelAnalytics/>
      </body>
    </html>
  );
}
