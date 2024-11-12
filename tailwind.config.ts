import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import twa from "tailwindcss-animate";

const wamellow = "rgba(255, 255, 255, 0.05)";
const violet = "rgb(139 92 246)";

/** @type {import('tailwindcss').Config} */
const config: Config = {
    darkMode: ["class"],
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))"
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))"
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))"
                }
            }
        }
    },
    plugins: [
        nextui({
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
        }),
        twa
    ]
};

export default config;