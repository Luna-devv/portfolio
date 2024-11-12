import type { ReactNode } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiKofi } from "react-icons/si";

export const platforms = {
    discord: <BsDiscord />,
    github: <FaGithub />,
    "ko-fi": <SiKofi />,
    email: <HiMail />
} satisfies Record<string, ReactNode>;
