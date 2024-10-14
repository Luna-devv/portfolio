import { cn } from "@/utils/cn";
import { lilita } from "@/utils/fonts";
import { Divider } from "@nextui-org/react";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>

        <div className={cn(lilita.className, "flex items-end gap-3 mt-4")}>
            <span className="text-5xl">
                Welcome to the Admin Hell
            </span>
        </div>

        <Divider className="mt-2 mb-4" />

        {children}
    </>);
}