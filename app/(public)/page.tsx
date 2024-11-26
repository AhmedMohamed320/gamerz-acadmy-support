// app/page.tsx (Server Component)
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { AnswerItem, QuestionNode } from "../types";
import HomeClient from "../(public)/HomeClient";

export default async function Home() {
    // Server-side data fetching
    const questions = await prisma.question.findMany();
    const formattedQuestions = questions.map((question) => ({
        ...question,
        answer: question.answer as unknown as AnswerItem[],
        children: (question.children as unknown as QuestionNode[]) || [],
    }));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeClient initialQuestions={formattedQuestions} />
        </Suspense>
    );
}