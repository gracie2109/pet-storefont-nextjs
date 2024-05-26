import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast";
import * as React from "react";
import { TailwindIndicator } from "@/components/tailwind-indicator"
import "./globals.css";
import {absoluteUrl, cn} from "@/lib/utils";


const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
})

import { siteConfig } from "@/configs/site-config"
export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "nextjs",
        "react",
        "petshop",
        "catshop",
        "dogshop"

    ],
    authors: [
        {
            name: "gracie2109",
            url: "https://www.facebook.com/phuongthao.trinh.sue/",
        },
    ],
    creator: "gracie2109",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og.jpg`],
        creator: "@gracie2109",
    },
    icons: {
        icon: "/icon.png",
    },
    manifest: absoluteUrl("/site.webmanifest"),
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    lexend.className,
                )}

            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <React.Fragment>
                        {children}
                        <TailwindIndicator />
                        <Toaster />
                    </React.Fragment>
                </ThemeProvider>
            </body>
        </html>
    );
}
