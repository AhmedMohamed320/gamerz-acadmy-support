'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { AnswerItem, QuestionNode } from "../types";

interface HomeClientProps {
    initialQuestions: (QuestionNode & { answer: AnswerItem[] })[];
}

export default function HomeClient({ initialQuestions }: HomeClientProps) {
    const [questions, setQuestions] = useState<(QuestionNode & { answer: AnswerItem[] })[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log("initialQuestions", initialQuestions);
            localStorage.removeItem("questions");
            localStorage.setItem("questions", JSON.stringify(initialQuestions));
            setQuestions(initialQuestions);
        }
    }, [initialQuestions]);

    return (
        <main>
            <header className="relative z-10 overflow-hidden h-screen">
                <img src="/Sayjn.gif" alt="" className="headerImg" />
                <div className="flex justify-center items-center z-10 mainContainer uppderHero h-full">
                    <div className="col-span-2 flex justify-center items-center flex-col gap-12 text-center max-w-full md:max-w-6xl">
                        <p className="text-8xl font-bold leading-normal wordSpace">
                            مرحبًا بكم في تجربة الدعم المتميزة!
                        </p>
                        <p className="text-4xl text-neutral-500 leading-snug">
                            جاهزين نساعدك تحل مشكلتك بخطوات بسيطة وسهلة!
                        </p>

                        <Link
                            href="/start"
                            className="text-3xl font-medium flex flex-col items-center justify-center p-4 px-8 cursor-pointer rounded-lg startButton"
                        >
                            <p>ابدأ الآن</p>
                            <IoIosArrowDown />
                        </Link>
                    </div>
                </div>
            </header>
        </main>
    );
}
