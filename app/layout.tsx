import "./globals.css";
import { Footer } from "@/components/footer";
import { cn } from "@/utils/cn";
import { outfit } from "@/utils/fonts";
import { getBaseUrl } from "@/utils/urls";
import type { Metadata, Viewport } from "next";

import { Provider } from "./provider";

export const viewport: Viewport = {
    themeColor: "#b09bf1",
    initialScale: 1
};

export async function generateMetadata(): Promise<Metadata> {

    const title = "Luna: I'm pretty silly :3";
    const description = "I am doing pretty random and silly stuff on the internet, and you wont stop me!";

    return {
        metadataBase: new URL(getBaseUrl()),

        title,
        description,

        alternates: {
            canonical: getBaseUrl()
        },

        openGraph: {
            title,
            description,
            type: "website",
            url: getBaseUrl(),
            images: `${getBaseUrl()}/open-graph.png`
        },

        twitter: {
            card: "summary",
            site: "lunish.nl",
            title,
            description,
            images: `${getBaseUrl()}/open-graph.png`
        },

        creator: "Luna (lunish.nl)",
        publisher: "Luna (lunish.nl)",

        robots: "index, follow"
    };
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            data-theme="dark"
            lang="en"
            className={cn(
                "dark:text-neutral-200 text-neutral-800",
                "flex justify-center"
            )}
        >
            <body
                className={cn(
                    outfit.className,
                    "w-full max-w-7xl m-4 mt-12"
                )}
            >
                <Provider>
                    {children}

                    <Footer />
                </Provider>
            </body>
        </html>
    );
}