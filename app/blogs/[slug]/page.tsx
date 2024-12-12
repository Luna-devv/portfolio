import { Separator } from "@/components/ui/separator";
import { getBlog } from "@/lib/database/blog";
import { getUser } from "@/lib/database/users";
import { getBaseUrl } from "@/utils/urls";
import type { Metadata } from "next";

export const revalidate = false;
export const dynamic = "force-static";

const intl = new Intl.DateTimeFormat("en-US", {
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

    const user = await getUser(blog.user_id);

    return (
        <div>
            <h1 className="text-2xl font-medium mb-1">{blog.title}</h1>
            <p className="text-neutral-500">
                Posted by <a href={getBaseUrl()}>@{user?.username}</a> on <time>{intl.format(blog.created_at)}</time>
            </p>

            <Separator className="my-4" />

            <p className="break-all">{blog.text}</p>
        </div>
    );
}