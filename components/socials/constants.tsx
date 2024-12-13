import type { ReactNode } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiBluesky, SiKofi } from "react-icons/si";

export const platforms = {
    discord: <BsDiscord />,
    github: <FaGithub className="relative right-0.5 -mr-[1px]" />,
    "ko-fi": <SiKofi />,
    email: <HiMail className="size-5 relative right-0.5 -mr-0.5" />,
    bluesky: <SiBluesky className="p-[1px]" />
} satisfies Record<string, ReactNode>;