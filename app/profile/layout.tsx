import { getUserFromCookies } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <h1 className="text-2xl font-medium mb-5">
            {"👋 "}Hey,{" "}
            <Suspense fallback={<></>}>
                <User />
            </Suspense>
        </h1>

        {children}
    </>);
}

async function User() {
    const jar = await cookies();

    const user = await getUserFromCookies(jar);
    if (!user) redirect("/");

    return user.username;
}