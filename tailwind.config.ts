import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const wamellow = "rgba(255, 255, 255, 0.05)";
const violet = "rgb(139 92 246)";

/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            }
        }
    },
    plugins: [nextui({
        themes: {
            dark: {
                colors: {
                    secondary: {
                        foreground: "rgb(255 255 255)",
                        DEFAULT: violet
                    },
                    default: {
                        foreground: "rgb(212 212 212)",
                        DEFAULT: wamellow
                    },
                    overlay: wamellow,
                    content1: wamellow,
                    content2: wamellow,
                    content3: wamellow,
                    content4: wamellow
                }
            },
            violet: {
                extend: "dark",
                colors: {
                    default: {
                        foreground: "rgb(255 255 255)",
                        DEFAULT: violet
                    }
                }
            }
        }
    })]
};

export default config;