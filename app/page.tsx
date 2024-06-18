import Markdown from "@/components/markdown";
import { User } from "@/components/user";
import { getUser } from "@/lib/discord/users";
import { config } from "@/utils/config";
import { readFile } from "fs/promises";

const conf = config();

export default async function Home() {
    const about = await readFile(process.cwd() + "/public/about.md", "utf-8");
    const user = await getUser(conf.id);

    if (!user) return (
        <span className="bg-red-400/40 text-red-600">
            Something went wrong!
        </span>
    );

    return (
        <main className="flex flex-col md:flex-row gap-8 w-full">
            <User
                avatar_url={user.avatar_url}
                bio={conf.bio}
                nickname={user.global_name}
                username={user.username}
            />

            <div className="text-lg">
                <Markdown markdown={about} />
            </div>
        </main>
    );
}
