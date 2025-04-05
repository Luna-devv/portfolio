import Markdown from "@/components/markdown";
import { Separator } from "@/components/ui/separator";
import { getBlog } from "@/lib/database/blog";
import { getUser } from "@/lib/database/users";
import { getBaseUrl, getCanonicalUrl } from "@/utils/urls";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { Bread } from "./bread";
import { BlogFooter } from "./footer";
import { User } from "./user";

export const revalidate = false;

const intlDateTime = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
});

const getCachedBlog = unstable_cache(
    (slug: string) => getBlog(slug),
    ["blogs"],
    {
        revalidate: false,
        tags: ["blogs"]
    }
);

interface Props {
    params: Promise<{ slug: string; }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const blog = await getCachedBlog((await params).slug);
    if (!blog) return {};

    const user = await getUser(blog.user_id);

    return {
        title: blog.title,
        description: blog.description,

        alternates: {
            canonical: getCanonicalUrl("blog", blog.slug)
        },

        openGraph: {
            title: blog.title,
            description: blog.description,
            type: "article"
        },

        authors: [{ name: user?.username, url: getBaseUrl() }],
        publisher: getBaseUrl().split("://")[1],

        robots: "index, follow"
    };
}

export default async function Home({
    params
}: Props) {
    const blog = await getCachedBlog((await params).slug);

    if (!blog) {
        return <h1>Blog not found</h1>;
    }

    return (
        <div>
            <Bread slug={blog.slug} />

            <h1 className="text-3xl font-medium mt-3 mb-0.5">{blog.title}</h1>
            <div className="text-neutral-400">
                Posted by <User id={blog.user_id} /> on <time>{intlDateTime.format(new Date(blog.created_at))}</time>
            </div>

            <Separator className="my-4" />

            <Markdown markdown={blog.text} />

            <BlogFooter userId={blog.user_id} />
        </div>
    );
}