/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ReactNode } from "react";
import { HiExternalLink } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default async function Markdown({
    markdown
}: {
    markdown: string;
}) {
    const { renderToString } = await import("react-dom/server");

    function parseDiscordMarkdown(content: string) {
        return content
            .replace(/__(.*?)__/g, "<u>$1</u>")
            .replace(/<a?:\w{2,32}:\d{15,21}>/g, (match) => {
                const emojiId = match.match(/\d{15,21}/)?.[0]!;

                return renderToString(
                    <img
                        alt='emoji'
                        className='rounded-md inline h-5 w-5'
                        src={`https://cdn.discordapp.com/emojis/${emojiId}.webp?size=40&quality=lossless`}
                    />
                );
            });
    }

    function createHId(text: ReactNode) {
        return text
            ?.toString()
            .toLowerCase()
            .replace(/ +/g, "-");
    }

    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: (props) => (
                    <Link
                        href={`#${createHId(props.children)}`}
                        className="flex mt-10 mb-3 cursor-pointer dark:text-neutral-100 text-neutral-900 hover:underline w-fit"
                    >
                        <h2 id={createHId(props.children)} className="text-3xl font-semibold" {...props} />
                    </Link>
                ),

                h2: (props) => (
                    <Link
                        href={`#${createHId(props.children)}`}
                        className="flex mt-6 mb-2 cursor-pointer dark:text-neutral-100 text-neutral-900 hover:underline w-fit"
                    >
                        <h1 id={createHId(props.children)} className="text-2xl font-semibold" {...props} />
                    </Link>
                ),

                h3: (props) => (
                    <Link
                        href={`#${createHId(props.children)}`}
                        className="flex mt-6 mb-2 cursor-pointer dark:text-neutral-100 text-neutral-900 hover:underline w-fit"
                    >
                        <h3 id={createHId(props.children)} className="text-xl font-semibold" {...props} />
                    </Link>
                ),

                strong: (props) => <span className="font-semibold dark:text-neutral-200 text-neutral-800" {...props} />,
                i: (props) => <span className="italic" {...props} />,
                del: (props) => <span className="line-through" {...props} />,
                ins: (props) => <span className="underline" {...props} />,

                code: ({ ref, color, ...props }) => {
                    return (
                        <div
                            className="bg-wamellow border border-wamellow-light text-neutral-200 rounded-md p-3 my-2 break-all overflow-x-scroll"
                            {...props}
                        />
                    );
                },
                img: ({ alt = "image", ...props }) => {
                    const isFullWidth = props.src?.includes("fullwidth=true");

                    return (
                        <span
                            className={cn(
                                "w-fit flex-col items-center inline mt-2!",
                                alt === "emoji" ? "inline" : "flex",
                                isFullWidth ? "max-w-3xl" : "max-w-lg"
                            )}
                        >
                            <img alt={alt} className="rounded-md" loading="lazy" {...props} />
                        </span>
                    );
                },
                a: ({ href, children, ...props }) => (
                    <Link
                        href={href || "#"}
                        target="_blank"
                        className="text-violet-400 underline decoration-black hover:decoration-current duration-100"
                        {...props}
                    >
                        {children} {!JSON.stringify(children).includes("http") && <HiExternalLink className="inline" />}
                    </Link>
                ),

                table: (props) => <table className="mt-4 table-auto w-full divide-y-1 divide-wamellow overflow-scroll" {...props} />,
                th: ({ ...props }) => <th className=" px-2 pb-2 font-medium text-neutral-800 dark:text-neutral-200 text-left" {...props} />,
                tr: ({ ...props }) => <tr className="divide-x-1 divide-wamellow" {...props} />,
                td: ({ ...props }) => <td className="px-2 py-1 divide-x-8 divide-wamellow break-all" {...props} />,

                ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-1 marker:text-neutral-300/40 my-1" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc list-inside space-y-1 marker:text-neutral-300/40 my-1" {...props} />,

                p: ({ ...props }) => <span {...props} />
            }}
        >
            {parseDiscordMarkdown(markdown)}
        </ReactMarkdown>
    );

}