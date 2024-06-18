import Markdown from "@/components/markdown";
import { User } from "@/components/user";
import { getConfig, getFacts, getSocials } from "@/lib/database/get";
import { readFile } from "fs/promises";

export const dynamic = "force-static";
export const revalidate = false;

export default async function Home() {
    const about = await readFile(process.cwd() + "/public/about.md", "utf-8");

    const [config, facts, socials] = await Promise.all([
        getConfig("en"),
        getFacts(),
        getSocials()
    ]);

    if (!config || !socials) return (
        <div className="bg-red-400/40 text-red-600 p-2 rounded-md text-2xl">
            <div className="text-4xl font-medium">Something went wrong!</div>
            No configuration was found inside the database.
        </div>
    );

    return (
        <main className="flex flex-col md:flex-row gap-8 w-full">
            <User
                config={config}
                facts={facts}
                socials={socials}
            />

            <div className="text-lg">
                <Markdown markdown={about} />
            </div>
        </main>
    );
}
