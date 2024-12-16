"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Nav() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 flex justify-center items-center p-5 dark:bg-custom-dark bg-custom-light">
                <Link href="/">
                    <img src="/gamers-academy.png" alt="gamers-academy-logo"  width={60}/>
                </Link>
                <button
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="p-2 flex justify-center items-center  dark:text-custom-light text-custom-dark rounded-lg absolute left-6 text-4xl w-12 h-12"
                >
                    {theme === "dark" ? <MdOutlineLightMode/> : <MdDarkMode />}
                </button>
            </div>
        </>
    );
}
