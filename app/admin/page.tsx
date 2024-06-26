import { Button } from "@nextui-org/react";
import { revalidatePath } from "next/cache";

export default function Page() {

    async function update() {
        "use server";
        revalidatePath("/", "layout");
        revalidatePath("/", "page");
    }

    return (
        <div>
            pain

            <form action={update} >
                <Button
                    type="submit"
                >
                    Update
                </Button>
            </form>
        </div>
    );
}
