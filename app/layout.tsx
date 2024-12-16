import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Nav from "./(public)/_components/nav";

export const metadata: Metadata = {
    title: "gamerz-academy",
    description: "gamerz academy support page",
    icons: {
        icon: "/gamers-academy.png", 
    },
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="dark:text-custom-light text-custom-dark bg-custom-light dark:bg-custom-dark">
                <ThemeProvider attribute="class">
                    <Nav />
                    <Toaster />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
