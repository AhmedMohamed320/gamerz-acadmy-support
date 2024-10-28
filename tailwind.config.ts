import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/components/(button|input|link|modal|select|spinner|tabs|ripple|listbox|divider|popover|scroll-shadow).js",
    ],
    theme: {
        extend: {
            colors: {
                "custom-dark": "#111216",
                "custom-light": "#E9E9E9",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [nextui()],
};
export default config;
