import "@/styles/globals.css";

import { GeistSans } from 'geist/font/sans'
import { headers } from "next/headers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { type Metadata } from "next";
import { Suspense } from "react";
import Analytics from "@/components/utils/GoogleTagmanager";
import { env } from "@/env.mjs";
import { ThemeProvider } from "@/components/ThemeProvider";




export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: "Linkblare: The Ultimate Resource Hub for Developers | Discover the Tools You Need",
  description: "Struggling to find the best developer resources? Linkblare is your one-stop solution! Explore curated collections of websites, tools, and tutorials tailored to your specific needs. Dive into AI, machine learning, web development, and more. Set your preferences and discover relevant information quickly and efficiently. Empower your development journey with Linkblare.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: "LinkBlare",
    description: "Struggling to find the best developer resources? Linkblare is your one-stop solution! Explore curated collections of websites, tools, and tutorials tailored to your specific needs. Dive into AI, machine learning, web development, and more. Set your preferences and discover relevant information quickly and efficiently. Empower your development journey with Linkblare.",
    images: [
      {
        url: `${env.NEXT_PUBLIC_SITE_URL}/api/og/Linkblare: The Ultimate Resource Hub for Developers | Discover the Tools You Need`,
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
    <html lang="en" suppressHydrationWarning>
      <body className={` ${GeistSans.className} overflow-x-hidden max-w-[1920px] mx-auto `}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <Suspense><Analytics /></Suspense>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
          <Toaster />
          <VercelAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
