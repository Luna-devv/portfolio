import { db } from "@/lib/database";
import { blog } from "@/lib/database/schema";
import { getUserFromCookies } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const jar = await cookies();
    const user = await getUserFromCookies(jar);
    if (!user?.is_owner) return Response.json({ message: "Missing acess" });

    const { data, error } = blog.safeParse(await request.json());
    if (error) return Response.json({ message: error.toString() });

    return Response.json(
        await db
            .insertInto("blogs")
            .values({
                ...data,
                user_id: user.id
            })
            .returningAll()
            .execute()
    );
}