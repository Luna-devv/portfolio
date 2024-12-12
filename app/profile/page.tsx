import { Button } from "@/components/ui/button";
import { isOwner } from "@/utils/auth";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { logout, revalidate } from "./actions";

export default async function Page() {
    const jar = await cookies();

    return (
        <div className="flex gap-2 flex-wrap">
            <form action={logout} >
                <Button
                    variant="destructive"
                    type="submit"
                >
                    Logout
                </Button>
            </form>
            <Suspense>
                {await isOwner(jar) && (
                    <form action={revalidate} >
                        <Button
                            variant="secondary"
                            type="submit"
                        >
                            Revalidate
                        </Button>
                    </form>
                )}
            </Suspense>
        </div>
    );
}