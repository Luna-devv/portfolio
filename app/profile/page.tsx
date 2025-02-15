import { Button } from "@/components/ui/button";
import { isOwner } from "@/utils/auth";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { logout, revalidate } from "./actions";
import { ComposeBlogPost } from "./compose-blog";

export default async function Page() {
    const jar = await cookies();

    return (<>
        <div className="flex gap-2 flex-wrap mb-10">
            <form action={logout} >
                <Button
                    variant="destructive"
                    type="submit"
                >
                    Logout
                </Button>
            </form>
            {await isOwner(jar) && (
                <form action={revalidate}>
                    <Button
                        variant="secondary"
                        type="submit"
                    >
                        Revalidate Pages
                    </Button>
                </form>
            )}

        </div>
        <Suspense>
            {await isOwner(jar) && (
                <ComposeBlogPost
                    className="w-full sm:max-w-md space-y-4"
                />
            )}
        </Suspense>
    </>);
}