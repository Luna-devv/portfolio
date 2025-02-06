import Markdown from "@/components/markdown";
import { Separator } from "@/components/ui/separator";
import { getCanonicalUrl } from "@/utils/urls";
import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Bread } from "./bread";
import { Marks } from "./marks";

// TODO: use database

export function generateMetadata(): Metadata {
    const title = "Working with Luna";
    const description = "A guide to employ or working with Luna, a software developer and electrical engineer based in Austria.";

    return {
        title,
        description,

        alternates: {
            canonical: getCanonicalUrl("employ")
        },

        openGraph: {
            title,
            description,
            type: "article",
            tags: ["employ", "work", "engineering", "electronics", "programming"]
        },

        creator: "Luna (lunish.nl)",
        publisher: "Luna (lunish.nl)",

        robots: "index, follow"
    };
}

export default async function Employ() {
    const description = await readFile(join(process.cwd(), "app", "employ", "description.txt"), "utf8");

    return (
        <div>
            <Bread />

            <h1 className="text-3xl font-medium mt-3 mb-0.5">Working with Luna</h1>
            <div className="text-neutral-400">
                Find below the details of how to employ or work with me.
            </div>

            <Separator className="my-4" />

            <Markdown markdown={description} />

            <h1 className="text-3xl font-medium mt-16 mb-0.5">School Report Card</h1>
            <div className="text-neutral-400">
                A table of my latest assessments at the FHTTaRI (HTBLuVA).
            </div>

            <Separator className="my-4" />

            <p className="mb-6">
                Should you require a hard copy, please let me know and I will arrange for one to be sent to you via email.
                Data shown below is as of Friday 31st January 2025.
            </p>

            <Marks
                marks={[
                    ["Behaviour at school", 1],
                    ["Religion", 1],
                    ["German and communication", 2],
                    ["English", 1],
                    ["Applied maths", 1],
                    ["Business management", 1],
                    ["Energy systems", 3],
                    ["Drive technology and mechatronics workshop and production technology", 1],
                    ["Drive technology and mechatronics", 1],
                    ["Automation and Industrial Electronics Workshop and Production Engineering", 1],
                    ["Automation and industrial electronics", 2],
                    ["Computer-aided project development", 1],
                    ["Laboratory", 2]
                ]}
            />

            <p className="mt-6">
                <b>Assessment levels are categorised as follows:</b>
                <br />
                Very good (1), Good (2), Satisfactory (3), Sufficient (4), and Not sufficient (5).
                <br />
                <br />
                The highest (as in best) attainable grade is 1 (Very good), while the lowest (as in worst) attainable grade is 5 (Not sufficient; less than 50%).
            </p>
        </div>
    );
}