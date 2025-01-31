import { db } from "@/lib/database";
import { getCanonicalUrl } from "@/utils/urls";

interface Sitemap {
    priority: number;
    url: string;
}

export const revalidate = 691_200; // 8 days

export async function GET() {
    const sitemap: Sitemap[] = [
        {
            url: getCanonicalUrl(),
            priority: 1
        },
        {
            url: getCanonicalUrl("employ"),
            priority: 1
        }
    ];

    const blogs = await db
        .selectFrom("blogs")
        .selectAll()
        .execute();

    for (const blog of blogs) {
        sitemap.push({
            priority: 0.8,
            url: getCanonicalUrl("blog", blog.slug)
        });
    }

    return new Response(`
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${sitemap.map((site) => `
            <url>
                <loc>${site.url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>${site.priority}</priority>
            </url>
            `)}
        </urlset>`
        .replaceAll(",", ""), {
        headers: {
            "Content-Type": "text/xml"
        }
    });
}