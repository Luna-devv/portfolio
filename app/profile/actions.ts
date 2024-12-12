"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const jar = await cookies();
    jar.delete("session");

    revalidateTag("user" + jar.get("session")?.value);
    redirect("/");
}

export async function revalidate() {
    revalidateTag("configs");
    redirect("/");
}