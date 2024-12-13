import Markdown from "@/components/markdown";
import { User } from "@/components/user";
import { getConfig, getFacts, getSocials } from "@/lib/database/config";
import { unstable_cache } from "next/cache";

export const revalidate = false;

const getData = unstable_cache(
    () => Promise.all([
        getConfig(),
        getFacts(),
        getSocials()
    ]),
    ["configs"],
    {
        tags: ["configs"],
        revalidate: false
    }
);

export default async function Home() {
    const [config, facts, socials] = await getData();

    if (!config || !socials) return (
        <div className="bg-red-400/40 text-red-600 p-2 rounded-md text-2xl">
            <div className="text-4xl font-medium">Something went wrong!</div>
            No configuration was found inside the database.
        </div>
    );

    return (
        <main className="flex flex-col md:flex-row gap-12 w-full">
            <User
                config={config}
                facts={facts}
                socials={socials}
            />

            <div className="text-lg -mt-10">
                <Markdown markdown={config.readme} />
            </div>
        </main>
    );
}