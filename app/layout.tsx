import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "support page",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="absolute top-0 left-0 w-full z-50 bg-black shadow-lg flex justify-center ">
                    <Link href="/">
                        <img
                            src="/gamers-academy.png"
                            alt="gamers-academy-logo"
                            className="m-auto p-5"
                        />
                    </Link>
                </div>
                <Toaster />
                {children}
            </body>
        </html>
    );
}
