import { Chip, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BiCopyright } from "react-icons/bi";
import { HiCube, HiHeart } from "react-icons/hi";

import { UserLogin } from "./user-login";

export function Footer() {
    return (<>
        <Divider className="mt-16" />

        <div className="flex mt-6 gap-4 justify-between">

            <div>
                <LunaIsGay />
                <Info />
            </div>

            <Suspense fallback={<></>}>
                <UserLogin />
            </Suspense>
        </div>
    </>);
}

function LunaIsGay() {
    return (
        <div className="flex items-center dark:text-neutral-100 text-neutral-900 gap-1 font-semibold">
            <HiHeart className="relative top-[1px] text-[#f8746e]" />
            <span className="text-xl bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">Luna</span>
            <span className="text-xl bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">is</span>
            <span className="text-xl bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Gay</span>
        </div>
    );
}

function Info() {
    return (
        <div className="mb-3 text-neutral-500">
            <span className="flex gap-1 items-center">
                <BiCopyright />
                <span>
                    <Link href="/" className="hover:underline">Luna {new Date(1_635_609_600_000).getFullYear()} - {new Date().getFullYear()}</Link>,
                    not affiliated with anyone.
                </span>
            </span>
            <span className="flex gap-1 items-center">
                <HiCube />
                <span className="flex items-center">
                    Made with love & autism by
                    {/* Do not alter the href, image src and author name */}
                    <Chip
                        className="relative top-0.5 ml-0.5"
                        as={Link}
                        href="https://github.com/Luna-devv/portfolio"
                        startContent={
                            <Image
                                src="https://avatars.githubusercontent.com/u/71079641?s=48&v=4"
                                alt="Luna-devv"
                                width={18}
                                height={18}
                                className="rounded-full"
                            />
                        }
                    >
                        Luna-devv
                    </Chip>
                </span>
            </span>
        </div>
    );
}