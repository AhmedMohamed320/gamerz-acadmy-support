// app/page.tsx (Home page)
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import prisma from "@/lib/prisma"; // Import your prisma client

interface AnswerItem {
    id: string;
    type: "text" | "img" | "link";
    value: string;
    pageId?: string;
}

interface QuestionNode {
    id: string;
    title: string;
    answer?: AnswerItem[];
    children?: QuestionNode[];
    createdAt: Date;
    updatedAt: Date;
}

export default async function Home() {
    // Fetch data from the server before rendering the page
    const questions = await prisma.question.findMany();
    const formattedQuestions = questions.map((question) => ({
        ...question,
        answer: question.answer as unknown as AnswerItem[],
        children: (question.children as unknown as QuestionNode[]) || [],
    }));

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

                        {/* Pass the questions as a query to the next page */}
                        <Link
                            href={{
                                pathname: "/questionsTree",
                                query: {
                                    questions:
                                        JSON.stringify(formattedQuestions),
                                }, // pass questions to the next page
                            }}
                            className="text-3xl font-medium flex flex-col items-center justify-center p-4 px-8 cursor-pointer rounded-lg startButton"
                        >
                            <p>ابدأ الآن.</p>
                            <IoIosArrowDown />
                        </Link>
                    </div>
                </div>
            </header>
        </main>
    );
}
