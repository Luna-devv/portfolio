import Markdown from "@/components/markdown";
import { Separator } from "@/components/ui/separator";
import { getBlog } from "@/lib/database/blog";
import { getUser } from "@/lib/database/users";
import { getBaseUrl } from "@/utils/urls";
import type { Metadata } from "next";

import { Bread } from "./bread";
import { User } from "./user";

export const revalidate = false;
export const dynamic = "force-static";

const intlDateTime = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
});

interface Props {
    params: Promise<{ slug: string; }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const blog = await getBlog((await params).slug);
    if (!blog) return {};

    const user = await getUser(blog.user_id);

    return {
        title: blog.title,
        description: blog.description,

        openGraph: {
            title: blog.title,
            description: blog.description
        },

        authors: [{ name: user?.username, url: getBaseUrl() }],
        publisher: getBaseUrl().split("://")[1],

        robots: "index, follow"
    };
}

export default async function Home({
    params
}: Props) {
    const blog = await getBlog((await params).slug);

    if (!blog) {
        return <h1>Blog not found</h1>;
    }

    console.log("hi");

    return (
        <div>
            <Bread slug={blog.slug} />

            <h1 className="text-3xl font-medium mt-3 mb-0.5">{blog.title}</h1>
            <div className="text-neutral-500">
                Posted by <User id={blog.user_id} /> on <time>{intlDateTime.format(blog.created_at)}</time>
            </div>

            <Separator className="my-4" />

            <Markdown markdown={blog.text} />
        </div>
    );
}